import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, RoomCreate } from '../models/room';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly apiUrl = 'https://localhost:7099/api/room'
  constructor(private readonly http: HttpClient, private readonly auth: AuthService) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  createRoom(room: RoomCreate): Observable<Room> {
    if (!this.auth.isAdmin())
      return of();
    return this.http.post<Room>(this.apiUrl, room, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  editRoom(room: Room): Observable<Room> {
    if (!this.auth.isAdmin())
      return of();
    return this.http.put<Room>(this.apiUrl, room, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  deleteRoom(id: number): Observable<void> {
    if (!this.auth.isAdmin())
      return of();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}
