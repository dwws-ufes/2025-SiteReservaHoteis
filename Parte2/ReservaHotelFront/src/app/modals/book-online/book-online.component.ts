import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Room } from 'src/app/models/room';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-book-online',
  templateUrl: './book-online.component.html',
  styleUrls: ['./book-online.component.css']
})
export class BookOnlineComponent implements OnInit {
  rooms: Room[] = []
  checkIn: Date = new Date;
  checkOut: Date = new Date;
  adultsNumber: number = 1
  childNumber: number = 1
  roomQtd: number = 1;

  selectedRoomId!: number;
  selectedRoom!: Room;

  success = false;

  constructor(
    public dialogRef: MatDialogRef<BookOnlineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, rooms: Room[] },
    private readonly toastr: ToastrService,
    private readonly bookingService: BookingService
  ) {
  }

  ngOnInit() {
    this.rooms = this.data.rooms;
  }

  close(){
    this.dialogRef.close(this.success);
  }

  create() {
    let booking = {
      userId: this.data.userId,
      price: this.selectedRoom.price,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      roomId: this.selectedRoom.id,
      roomQtd: this.roomQtd,
      adultsNumber: this.adultsNumber,
      childNumber: this.childNumber
    }
    this.bookingService.createBooking(booking)
      .pipe(
        tap(() => {
          this.toastr.success('Booking Criado com sucesso!', 'Sucesso!');
          this.success = true;
          this.close();
        }),
        catchError(err => {
          this.toastr.error(err.error);
          return of([]);
        })
      )
      .subscribe();
  }

  changeRoom(roomId: number):void{
    this.selectedRoom = this.rooms.find(r => r.id == roomId)!;
  }
}
