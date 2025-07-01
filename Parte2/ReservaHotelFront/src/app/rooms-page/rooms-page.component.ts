import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { tap } from 'rxjs/operators';
import { Room } from '../models/room';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.css']
})
export class RoomsPageComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private readonly roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom() {
    this.roomService.getRooms()
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe()
  }
}
