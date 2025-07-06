import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking , BookingCreate} from '../models/booking';
import { Room } from '../models/room';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
    private readonly apiUrl = 'https://localhost:7099/api/booking';

    constructor(private readonly http: HttpClient) {}

    getBookingsByUserId(userId: string): Observable<Booking[]> {
      return this.http.get<Booking[]>(`${this.apiUrl}/${userId}`)
    }

    createBooking(booking: BookingCreate): Observable<Booking>{
        return this.http.post<Booking>(this.apiUrl, booking);
    }

    editBooking(booking: Booking): Observable<Booking>{
        return this.http.put<Booking>(this.apiUrl, booking);
    }

    deleteBooking(bookingid: number): Observable<Booking>{
        return this.http.delete<Booking>(`${this.apiUrl}/${bookingid}`);
    }

    getAll(): Booking[] {
        return [
  {
    "id": 101,
    "userId": "1",
    "price": 700,
    "checkIn": new Date,
    "checkOut": new Date,
    "roomId": 2,
    "roomQtd": 1,
    "adultsNumber": 2,
    "childNumber": 0
  },
  {
    "id": 102,
    "userId": "1",
    "price": 2400,
    "checkIn": new Date,
    "checkOut": new Date,
    "roomId": 4,
    "roomQtd": 1,
    "adultsNumber": 2,
    "childNumber": 1
  },
  {
    "id": 103,
    "userId": "1",
    "price": 1500,
    "checkIn": new Date,
    "checkOut": new Date,
    "roomId": 3,
    "roomQtd": 1,
    "adultsNumber": 1,
    "childNumber": 0
  },
  {
    "id": 104,
    "userId": "1",
    "price": 2850,
    "checkIn": new Date,
    "checkOut": new Date,
    "roomId": 5,
    "roomQtd": 1,
    "adultsNumber": 2,
    "childNumber": 2
  },
  {
    "id": 105,
    "userId": "1",
    "price": 5250,
    "checkIn": new Date,
    "checkOut": new Date,
    "roomId": 6,
    "roomQtd": 5,
    "adultsNumber": 4,
    "childNumber": 1
  }
]

    }

}