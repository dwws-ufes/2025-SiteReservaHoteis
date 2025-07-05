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
    return this.http.get<Room[]>(this.apiUrl);
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
}
