import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingItem , BookingCreate} from '../models/booking';
import { Room } from '../models/room';
import { RoomService } from './room.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
    private readonly apiUrl = 'https://localhost:7099/api/user'
    private bookingItem:BookingItem = new BookingItem();

    constructor(private roomService: RoomService, private readonly http: HttpClient) {}

    getBookingsByUserId(userId: string): Booking[] {
        let booking: Booking[] = [];
        this.getBookings()
            .pipe(map(booking => booking.filter(r => r.userId === userId)))
            .subscribe(arr => booking = arr);
        return booking;
    }    
    
    ChangeRoom(room: Room):void{
        this.bookingItem.room = room;
    }

    changeQuantity(quantity:number){
        this.bookingItem.quantity = quantity
    }

    getBookingItem():BookingItem{
        return this.bookingItem;
    }

    getBookings(): Observable<Booking[]> {
        return of(this.getAll());
        //return this.http.get<Booking[]>(this.apiUrl);
    }

    createBooking(booking: BookingCreate): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
    }

    editBooking(bookingid:number): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
    }

    deleteBooking(bookingid:number): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
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