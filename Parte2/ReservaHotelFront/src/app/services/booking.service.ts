import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingItem , BookingCreate} from '../models/booking';
import { Room } from '../models/room';
import { RoomService } from './room.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
    private readonly apiUrl = 'https://localhost:7099/api/user'
    private bookingItem:BookingItem = new BookingItem();

    constructor(private roomService: RoomService, private readonly http: HttpClient) {}

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
        return this.http.get<Booking[]>(this.apiUrl);
    }

    createBooking(): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
    }

    editBooking(bookingid:number): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
    }

    deleteBooking(bookingid:number): Observable<Booking>{
        return this.http.get<Booking>(this.apiUrl);
    }

}