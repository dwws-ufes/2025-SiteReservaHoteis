import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Booking } from 'src/app/models/booking';
import { Room } from 'src/app/models/room';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit{

  booking!: Booking;
  rooms: Room[] = [];

  selectedRoomId!: number;
  selectedRoom!: Room;

  success = false;

  constructor(
    public dialogRef: MatDialogRef<BookingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: Booking, rooms: Room[] },
    private readonly toastr: ToastrService,
    private readonly bookingService: BookingService
  ) { }

  ngOnInit() {
    this.booking = {
      id: this.data.booking.id,
      userId: this.data.booking.userId,
      price: this.data.booking.price,
      checkIn: this.data.booking.checkIn,
      checkOut: this.data.booking.checkOut,
      roomId: this.data.booking.roomId,
      roomQtd: this.data.booking.roomQtd,
      adultsNumber: this.data.booking.adultsNumber,
      childNumber: this.data.booking.childNumber
    };

    this.rooms = this.data.rooms;

    this.selectedRoomId = this.data.booking.room?.id as number;
    this.selectedRoom = this.data.rooms.find(r => r.id == this.selectedRoomId) as Room;

    console.log(this.booking);
  }

  close(){
    this.dialogRef.close(this.success);
  }

  edit() {
    this.bookingService.editBooking(this.booking)
      .pipe(
        tap(() => {
          this.toastr.success('Booking atualizado com sucesso!', 'Sucesso!');
          this.success = true;
          this.close();
        })
      )
      .subscribe();
  }

  changeRoom(roomId: number): void{
    this.selectedRoom = this.rooms.find(r => r.id == roomId)!;
  }

  formatDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  parseDate(valor: string): Date {
    return new Date(valor);
  }
}
