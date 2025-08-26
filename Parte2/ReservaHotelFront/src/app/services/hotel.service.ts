import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY, concat } from 'rxjs';
import { map, tap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly apiUrl    = `${environment.url}/api/hotels`;
  private readonly searchUrl = `${environment.url}/api/hotels/search`;

  private readonly CACHE_KEY = 'hotels:v1';
  private readonly TTL_MS = 1000 * 60 * 60 * 24; // 24h

  constructor(private http: HttpClient) {}

  get(opts?: { force?: boolean }): Observable<Hotel[]> {
    const cached = this.loadFromCache();

    const network$ = this.http.get<any>(this.apiUrl).pipe(
      map(raw => this.normalizeResponse(raw)),
      tap(list => this.saveToCache(list)),
      catchError(err => {
        console.error('[HotelService] erro na API', err);
        return EMPTY;
      })
    );

    if (opts?.force) return network$;

    if (cached && !this.isExpired(cached.ts)) {
      return concat(of(cached.data), network$);
    }

    return network$;
  }

  searchByName(name: string, limit = 200): Observable<Hotel[]> {
    const q = (name ?? '').trim();
    if (!q) return of([]);

    return this.http.post<any>(this.searchUrl, { name: q, limit }).pipe(
      map(raw => this.normalizeResponse(raw)),
      catchError(err => {
        console.error('[HotelService] erro no search', err);
        return of([]); 
      })
    );
  }

  // ===== helpers de cache =====
  private loadFromCache(): { data: Hotel[]; ts: number } | null {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { data: Hotel[]; ts: number };
      if (!parsed?.data || !Array.isArray(parsed.data)) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  private saveToCache(data: Hotel[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch (e) {
      console.warn('[HotelService] falha ao salvar no localStorage', e as any);
    }
  }

  private isExpired(ts: number): boolean {
    return Date.now() - ts > this.TTL_MS;
  }

  private normalize(s: string | undefined | null): string {
    return (s ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  }

  private normalizeResponse(raw: any): Hotel[] {
    if (Array.isArray(raw)) {
      return raw
        .map((b: any): Hotel => this.toHotel(b))
        .filter(h => Number.isFinite(h.lat) && Number.isFinite(h.lng));
    }

    if (raw?.results?.bindings && Array.isArray(raw.results.bindings)) {
      const list: Hotel[] = raw.results.bindings.map((b: any) => this.toHotel(b));
      return list.filter(h => Number.isFinite(h.lat) && Number.isFinite(h.lng));
    }

    console.warn('[HotelService] Formato de resposta não reconhecido:', raw);
    return [];
  }

  private toHotel(b: any): Hotel {
    const pick = (obj: any, ...paths: string[]) => {
      for (const p of paths) {
        const v = p.split('.').reduce((acc: any, k: string) => acc?.[k], obj);
        if (v !== undefined && v !== null && v !== '') return v;
      }
      return undefined;
    };

    return {
      name: pick(b, 'label.value', 'name', 'Name') ?? '',
      uri:  pick(b, 'hotel.value', 'uri', 'Uri') ?? '',
      lat:  Number(pick(b, 'lat.value', 'latitude', 'Latitude', 'lat') ?? NaN),
      lng:  Number(pick(b, 'long.value', 'longitude', 'Longitude', 'lng') ?? NaN),
      city: pick(b, 'cityLabel.value', 'city', 'City') ?? undefined,
      country: pick(b, 'countryLabel.value', 'country', 'Country') ?? undefined,
      thumbnail: pick(b, 'thumb.value', 'thumbnail', 'Thumbnail') ?? undefined,
    };
  }

  /**
   * Retorna um hotel pelo nome a partir da lista carregada (cache + refresh do GET).
   * - Emite primeiro o match do cache (se existir), depois (se diferente) o da rede.
   * - Se não encontrar, emite `null`.
   * - Use { partial: true } para permitir "contém" em vez de igualdade exata.
   */
  getByName(
    name: string,
    opts?: { force?: boolean; partial?: boolean }
  ): Observable<Hotel | null> {
    const needle = this.normalize(name);

    const pick = (list: Hotel[]): Hotel | null => {
      if (!Array.isArray(list)) return null;
      const norm = (h: Hotel) => this.normalize(h.name);
      return opts?.partial
        ? (list.find((h: Hotel) => norm(h).includes(needle)) ?? null)
        : (list.find((h: Hotel) => norm(h) === needle) ?? null);
    };
    return this.get({ force: opts?.force }).pipe(
      map((list: Hotel[]) => pick(list)),
      distinctUntilChanged((a, b) => (a?.uri ?? a?.name) === (b?.uri ?? b?.name))
    );
  }

  findCachedByName(name: string): Hotel | null {
    const cached = this.loadFromCache();
    if (!cached || this.isExpired(cached.ts)) return null;

    const needle = this.normalize(name);
    return cached.data.find((h: Hotel) => this.normalize(h.name) === needle) ?? null;
  }
}
