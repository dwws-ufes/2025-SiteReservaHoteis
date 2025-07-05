import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, RoomCreate } from '../models/room';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly apiUrl = 'https://localhost:7099/api/room'
  constructor(private readonly http: HttpClient) { }

  getRoomById(roomId: number): Room {
    let room!: Room;
    this.getRooms()
      .pipe(map(rooms => rooms.filter(r => r.id === roomId)))
      .subscribe(arr => room = arr[0]);
    return room;
  }

  getRooms(): Observable<Room[]> {
    return of(this.getAll());
    //return this.http.get<Room[]>(this.apiUrl);
  }

  createRoom(room: RoomCreate): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  editRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.apiUrl, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll(): Room[] {
    return [
      {
        id: 1,
        name: "Deluxe Room",
        price: 350,
        imageUrl: "/assets/imgs/rooms/room1.jpg",
        description: "An elegant room with a king-size bed, floor-to-ceiling windows offering city views, and complimentary premium amenities."
      },
      {
        id: 2,
        name: "Executive Suite",
        price: 600,
        imageUrl: "/assets/imgs/rooms/room2.jpg",
        description: "Spacious 55 m² suite featuring a separate living area, work desk, minibar, and access to the Executive Lounge."
      },
      {
        id: 3,
        name: "Presidential Suite",
        price: 1200,
        imageUrl: "/assets/imgs/rooms/room3.jpg",
        description: "Luxurious 120 m² suite with a private dining room, home office, marble bathroom with whirlpool tub, and personalized butler service."
      },
      {
        id: 4,
        name: "Penthouse Suite",
        price: 2500,
        imageUrl: "/assets/imgs/rooms/room4.jpg",
        description: "Top-floor penthouse with a panoramic rooftop terrace, plunge pool, and dedicated concierge for 24/7 service."
      },
      {
        id: 5,
        name: "Villa Private",
        price: 3800,
        imageUrl: "/assets/imgs/rooms/room5.jpg",
        description: "Standalone villa featuring a private garden, heated infinity pool, and on-call personal chef for bespoke dining experiences."
      },
      {
        id: 6,
        name: "Royal Palace Suite",
        price: 7500,
        imageUrl: "/assets/imgs/rooms/room6.jpg",
        description: "Sumptuous suite inspired by classic palace décor, with grand reception room, private wine cellar, and helipad access."
      }
    ];
  }
}
