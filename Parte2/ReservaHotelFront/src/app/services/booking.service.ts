import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Booking, BookingCreate } from '../models/booking';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly apiUrl = `${environment.url}/api/booking`;

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) {}

  getBookingsByUserId(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/${userId}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
  }

  createBooking(booking: BookingCreate): Observable<Booking>{
      return this.http.post<Booking>(this.apiUrl, booking, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  editBooking(booking: Booking): Observable<Booking>{
      return this.http.put<Booking>(this.apiUrl, booking, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  deleteBooking(bookingid: number): Observable<Booking>{
      return this.http.delete<Booking>(`${this.apiUrl}/${bookingid}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
/** Obtém JSON-LD cru de /api/booking/:userId/rdf?format=jsonld */
  getBookingsJsonLd(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/rdf?format=jsonld`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
        Accept: 'application/ld+json'
      }
    }).pipe(
      catchError(err => {
        console.error('[BookingService] JSON-LD erro', err);
        return of({ '@context': 'https://schema.org/', '@graph': [] });
      })
    );
  }

  /** Mapeia JSON-LD -> array de Booking (shape do seu front) */
  mapJsonLdToBookings(doc: any): Booking[] {
    const graph = Array.isArray(doc?.['@graph']) ? doc['@graph'] : [];
    return graph
      .filter((n: any) => (n?.['@type'] ?? '').toLowerCase() === 'reservation')
      .map((n: any) => {
        const booking: any = {
          id: Number(this.tail(n['@id'])),
          userId: n?.underName?.identifier ?? '',
          price: Number(n?.totalPrice ?? 0),
          checkIn: n?.checkinTime ?? '',
          checkOut: n?.checkoutTime ?? '',
          roomId: Number(this.tail(n?.reservationFor?.['@id'] ?? '')),
          roomQtd: Number(n?.numRooms ?? n?.numberOfItems ?? 1),
          adultsNumber: Number(n?.numAdults ?? 0),
          childNumber: Number(n?.numChildren ?? 0),
        };
        return booking as Booking;
      });
  }

  /** Faz tudo de uma vez: chama JSON-LD e retorna Booking[] já mapeado */
  getBookingsByUserIdLd(userId: string): Observable<Booking[]> {
    return this.getBookingsJsonLd(userId).pipe(
      map(doc => this.mapJsonLdToBookings(doc))
    );
  }

  /** Obtém Turtle (texto) de /api/booking/:userId/rdf?format=turtle */
  getBookingsTurtle(userId: string): Observable<string> {
    const url = `${this.apiUrl}/${userId}/rdf?format=turtle`;
    return this.http.get(url, {
      responseType: 'text' as const,
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
        Accept: 'text/turtle'
      }
    }).pipe(
      catchError(err => {
        console.error('[BookingService] Turtle erro', err);
        return of('# erro ao obter turtle');
      })
    );
  }

  /** Baixa o arquivo .ttl localmente */
  downloadBookingsTurtle(userId: string, fileName = 'bookings.ttl'): void {
    this.getBookingsTurtle(userId).subscribe(ttl => {
      const blob = new Blob([ttl], { type: 'text/turtle;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  // ===== helpers =====

  private tail(iri: string): string {
    if (!iri) return '';
    const i = Math.max(iri.lastIndexOf('#'), iri.lastIndexOf('/'));
    return i >= 0 ? iri.substring(i + 1) : iri;
  }
}