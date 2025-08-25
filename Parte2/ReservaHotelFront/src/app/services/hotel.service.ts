import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY, concat } from 'rxjs';
import { map, tap, catchError, distinctUntilChanged  } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly apiUrl = `${environment.url}/api/hotels`;

  // cache localStorage
  private readonly CACHE_KEY = 'hotels:v1';
  private readonly TTL_MS = 1000 * 60 * 60 * 24; // 24h

  constructor(private http: HttpClient) {}

  /** Prioriza cache; se houver, emite já e atualiza em background. */
  get(opts?: { force?: boolean }): Observable<Hotel[]> {
    const cached = this.loadFromCache();

    const network$ = this.http.get<any>(this.apiUrl).pipe(
      map(raw => {
        // ======== MANTIDO DO JEITO QUE VOCÊ PEDIU =========
        if (Array.isArray(raw)) {
          return raw
            .map((b: any): Hotel => ({
              name: b?.label?.value ?? b?.name ?? '',
              uri: b?.hotel?.value ?? b?.uri ?? '',
              lat: Number(b?.lat?.value ?? b?.latitude ?? b?.lat ?? NaN),
              lng: Number(b?.long?.value ?? b?.longitude ?? b?.lng ?? NaN),
              city: b?.cityLabel?.value ?? b?.city ?? undefined,
              country: b?.countryLabel?.value ?? b?.country ?? undefined,
              thumbnail: b?.thumb?.value ?? b?.thumbnail ?? undefined,
            }))
            // ❌ não force o tipo aqui
            // .filter((h: Hotel) => Number.isFinite(h.lat) && Number.isFinite(h.lng))
            // ✅ só deixe o TS inferir
            .filter(h => Number.isFinite(h.lat) && Number.isFinite(h.lng));
        }
        // suporte quando vier no formato SPARQL padrão
        if (raw?.results?.bindings && Array.isArray(raw.results.bindings)) {
        const list: Hotel[] = raw.results.bindings.map((b: any): Hotel => ({
          name: b?.label?.value ?? b?.name ?? '',
          uri: b?.hotel?.value ?? b?.uri ?? '',
          lat: Number(b?.lat?.value ?? b?.latitude ?? b?.lat ?? NaN),
          lng: Number(b?.long?.value ?? b?.longitude ?? b?.lng ?? NaN),
          city: b?.cityLabel?.value ?? b?.city ?? undefined,
          country: b?.countryLabel?.value ?? b?.country ?? undefined,
          thumbnail: b?.thumb?.value ?? b?.thumbnail ?? undefined,
        }));

        return list.filter((h: Hotel) => Number.isFinite(h.lat) && Number.isFinite(h.lng));
      }

        console.warn('[HotelService] Formato de resposta não reconhecido:', raw);
        return [];
      }),
      tap(list => this.saveToCache(list)),
      catchError(err => {
        console.error('[HotelService] erro na API', err);
        // quando estamos emitindo cache + refresh, não queremos quebrar o fluxo
        return EMPTY;
      })
    );

    if (opts?.force) return network$;

    // cache válido → emite já + atualiza em background
    if (cached && !this.isExpired(cached.ts)) {
      return concat(of(cached.data), network$);
    }

    // sem cache / expirado → busca direto
    return network$;
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
      console.warn('[HotelService] falha ao salvar no localStorage', e);
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

  /**
   * Retorna um hotel pelo nome.
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

    // Reuso do get() que já prioriza cache + faz refresh
    return this.get({ force: opts?.force }).pipe(
      map((list: Hotel[]) => pick(list)),
      // evita emitir o mesmo hotel duas vezes (cache e rede iguais)
      distinctUntilChanged((a, b) => (a?.uri ?? a?.name) === (b?.uri ?? b?.name))
    );
  }

  /** Versão síncrona: busca somente no cache. Retorna null se não houver ou se expirado. */
  findCachedByName(name: string): Hotel | null {
    const cached = this.loadFromCache();
    if (!cached || this.isExpired(cached.ts)) return null;

    const needle = this.normalize(name);
    return cached.data.find((h: Hotel) => this.normalize(h.name) === needle) ?? null;
  }
}
