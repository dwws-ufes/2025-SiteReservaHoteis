import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomCreateComponent } from '../modals/room-create/room-create.component';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { tap } from 'rxjs/operators';
import { RoomEditComponent } from '../modals/room-edit/room-edit.component';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  rooms: Room[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getRoom();
  }

  createRoom() {
    const dialog = this.dialog.open(RoomCreateComponent, {
      data: { btnSuccess: 'Create room' },
      width: '400px'
    });

    dialog.afterClosed()
      .subscribe(success => {
        if (!success)
          return;

        this.getRoom();
      })
  }

  editRoom(room: Room) {
    const dialog = this.dialog.open(RoomEditComponent, {
      data: { room, btnSuccess: 'Edit room', btnDelete: 'Delete room' },
      width: '400px'
    });

    dialog.afterClosed()
      .subscribe(success => {
        if (!success)
          return;

        this.getRoom();
      })
  }

  getRoom() {
    this.roomService.getRooms()
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe()
  }
}
