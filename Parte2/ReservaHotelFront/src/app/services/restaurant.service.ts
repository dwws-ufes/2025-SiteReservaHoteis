import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY, concat } from 'rxjs';
import { map, tap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly apiUrl = `${environment.url}/api/restaurants`;

  private readonly CACHE_KEY = 'restaurants:v1';
  private readonly TTL_MS = 1000 * 60 * 60 * 24; // 24h

  constructor(private http: HttpClient) {}

  get(opts?: { force?: boolean }): Observable<Restaurant[]> {
    const cached = this.loadFromCache();

    const network$ = this.http.get<any>(this.apiUrl).pipe(
      map(raw => {
        if (Array.isArray(raw)) {
          return raw.map((b: any): Restaurant => this.toRestaurant(b));
        }

        if (raw?.results?.bindings && Array.isArray(raw.results.bindings)) {
          const list: Restaurant[] = raw.results.bindings.map((b: any) => this.toRestaurant(b));
          return list;
        }

        console.warn('[RestaurantService] Formato de resposta não reconhecido:', raw);
        return [];
      }),
      tap(list => this.saveToCache(list)),
      catchError(err => {
        console.error('[RestaurantService] erro na API', err);
        return EMPTY;
      })
    );

    if (opts?.force) return network$;

    if (cached && !this.isExpired(cached.ts)) {
      return concat(of(cached.data), network$);
    }

    return network$;
  }

  // ===== helpers =====

  private toRestaurant(b: any): Restaurant {
    const get = (obj: any, ...paths: string[]) => {
      for (const p of paths) {
        const v = p.split('.').reduce((acc: any, k: string) => acc?.[k], obj);
        if (v !== undefined && v !== null && v !== '') return v;
      }
      return undefined;
    };

    const name =
      get(b, 'label.value', 'name.value', 'name', 'label') ?? '';

    const uri =
      get(b, 'restaurant.value', 'city.value', 'uri.value', 'uri') ?? '';

    const city =
      get(b, 'cityLabel.value', 'cityName.value', 'cityLabel', 'city') ?? undefined;

    const thumbnail =
    get(
      b,
      'thumb.value', 'thumbnail.value', 'image.value',
      'thumb', 'thumbnail', 'image', 'imageUrl',
      'Thumb', 'Thumbnail', 'Image', 'ImageUrl'
    ) ?? undefined;

  return { name, uri, city, thumbnail };
}

  private loadFromCache(): { data: Restaurant[]; ts: number } | null {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { data: Restaurant[]; ts: number };
      if (!parsed?.data || !Array.isArray(parsed.data)) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  private saveToCache(data: Restaurant[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch (e) {
      console.warn('[RestaurantService] falha ao salvar no localStorage', e);
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
 * Retorna um restaurante pelo nome.
 * - Emite primeiro o match do cache (se existir), depois (se diferente) o da rede.
 * - Se não encontrar, emite `null`.
 * - Use { partial: true } para permitir "contém" em vez de igualdade exata.
 */
getByName(
  name: string,
  opts?: { force?: boolean; partial?: boolean }
): Observable<Restaurant | null> {
  const needle = this.normalize(name);

  const pick = (list: Restaurant[]): Restaurant | null => {
    if (!Array.isArray(list)) return null;
    const norm = (r: Restaurant) => this.normalize(r.name);
    return opts?.partial
      ? (list.find((r: Restaurant) => norm(r).includes(needle)) ?? null)
      : (list.find((r: Restaurant) => norm(r) === needle) ?? null);
  };


  return this.get({ force: opts?.force }).pipe(
    map((list: Restaurant[]) => pick(list)),
    distinctUntilChanged((a, b) =>
      `${a?.name ?? ''}::${a?.city ?? ''}` === `${b?.name ?? ''}::${b?.city ?? ''}`
    )
  );
}

findCachedByName(name: string): Restaurant | null {
  const cached = this.loadFromCache();
  if (!cached || this.isExpired(cached.ts)) return null;

  const needle = this.normalize(name);
  return cached.data.find((r: Restaurant) => this.normalize(r.name) === needle) ?? null;
}


  
}
