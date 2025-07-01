import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../../shared/models/Room';
import { RoomService } from '../../../services/room/room-service';

@Component({
  selector: 'app-room-coponent',
  imports: [],
  templateUrl: './room-coponent.html',
  styleUrl: './room-coponent.css'
})
export class RoomCoponent implements OnInit{

  rooms: Room[] = [];

  constructor (private roomService: RoomService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.rooms = this.roomService.getAll();
    })
  }
}
