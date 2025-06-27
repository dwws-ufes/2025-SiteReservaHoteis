import { Injectable } from '@angular/core';
import { Booking } from '../../shared/models/Booking';
import { UserService } from '../user/user-service';
import { RoomService } from '../room/room-service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private userService: UserService, private roomService: RoomService) { }

  getAll(): Booking[]{
    return [
      {
        id: 1,
        user: this.userService.getUserById(1),
        checkIn: new Date('2025-07-10'),
        checkOut: new Date('2025-07-15'),
        room: this.roomService.getRoomById(1),
        roomQtd: 1,
        adultsNumber: 2,
        childNumber: 0,
        totalPrice: 250
      },
      {
        id: 2,
        user: this.userService.getUserById(2),
        checkIn: new Date('2025-08-01'),
        checkOut: new Date('2025-08-05'),
        room: this.roomService.getRoomById(2),
        roomQtd: 1,
        adultsNumber: 1,
        childNumber: 1,
        totalPrice: 250
      },
      {
        id: 3,
        user: this.userService.getUserById(3),
        checkIn: new Date('2025-09-20'),
        checkOut: new Date('2025-09-25'),
        room: this.roomService.getRoomById(3),
        roomQtd: 1,
        adultsNumber: 2,
        childNumber: 2,
        totalPrice: 250
      },
      {
        id: 4,
        user: this.userService.getUserById(4),
        checkIn: new Date('2025-07-18'),
        checkOut: new Date('2025-07-20'),
        room: this.roomService.getRoomById(4),
        roomQtd: 1,
        adultsNumber: 2,
        childNumber: 0,
        totalPrice: 250
      },
      {
        id: 5,
        user: this.userService.getUserById(5),
        checkIn: new Date('2025-12-24'),
        checkOut: new Date('2025-12-31'),
        room: this.roomService.getRoomById(5),
        roomQtd: 1,
        adultsNumber: 4,
        childNumber: 2,
        totalPrice: 250
      },
      {
        id: 6,
        user: this.userService.getUserById(6),
        checkIn: new Date('2025-11-01'),
        checkOut: new Date('2025-11-03'),
        room: this.roomService.getRoomById(6),
        roomQtd: 1,
        adultsNumber: 3,
        childNumber: 1,
        totalPrice: 250
      }
    ]
  }
}
