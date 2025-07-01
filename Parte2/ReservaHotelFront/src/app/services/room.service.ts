import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, RoomCreate } from '../models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly apiUrl = 'https://localhost:7099/api/room'
  constructor(private readonly http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  createRoom(room: RoomCreate): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  editRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.apiUrl, room);
  }

  deleteRoom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
