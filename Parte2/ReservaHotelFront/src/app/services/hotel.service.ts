import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly apiUrl = `${environment.url}/api/hotels`;

  constructor(private http: HttpClient) {}

  get(): Observable<Hotel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((raw) => {
        // Caso 1: resposta SPARQL padrão => { results: { bindings: [...] } }
        if (raw?.results?.bindings && Array.isArray(raw.results.bindings)) {
          return raw.results.bindings
            .map((b: any) => ({
              name: b?.label?.value ?? b?.name ?? '',
              uri: b?.hotel?.value ?? b?.uri ?? '',
              lat: Number(b?.lat?.value ?? b?.latitude ?? NaN),
              lng: Number(b?.long?.value ?? b?.longitude ?? NaN),
            }))
            .filter((h: Hotel) => Number.isFinite(h.lat) && Number.isFinite(h.lng));
        }

        // Caso 2: já vem um array (pode ser simplificado OU “bindings-like”)
        if (Array.isArray(raw)) {
          return raw
            .map((b: any) => ({
              name: b?.label?.value ?? b?.name ?? '',
              uri: b?.hotel?.value ?? b?.uri ?? '',
              lat: Number(b?.lat?.value ?? b?.latitude ?? b?.lat ?? NaN),
              lng: Number(b?.long?.value ?? b?.longitude ?? b?.lng ?? NaN),
            }))
            .filter((h: Hotel) => Number.isFinite(h.lat) && Number.isFinite(h.lng));
        }

        // Caso desconhecido
        console.warn('Formato de resposta não reconhecido:', raw);
        return [];
      })
    );
  }
}