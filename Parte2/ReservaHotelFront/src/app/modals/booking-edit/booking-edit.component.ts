import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Booking, BookingItem } from 'src/app/models/booking';
import { Room } from 'src/app/models/room';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit{

  booking!: Booking;
  bookingItem!:BookingItem;
  rooms: Room[] = []
  selectedRoom!: Room;

  success = false;

  constructor(
          
          public dialogRef: MatDialogRef<BookingEditComponent>,
          @Inject(MAT_DIALOG_DATA) public data: { booking: Booking },
          private readonly toastr: ToastrService,
          private bookingService: BookingService,
          private roomService: RoomService
    ) {
      this.setBookingItem();
      this.booking = {
        id: data.booking.id,
        userId: data.booking.userId,
        price: data.booking.price,
        checkIn: data.booking.checkIn,
        checkOut: data.booking.checkOut,
        roomId: data.booking.roomId,
        roomQtd: data.booking.roomQtd,
        adultsNumber: data.booking.adultsNumber,
        childNumber: data.booking.childNumber
      };
  }

  ngOnInit() {
    this.bookingItem.room = this.getRoomById(this.booking.roomId)!;
    this.bookingItem.quantity = this.booking.roomQtd;
    this.selectedRoom = this.getRoomById(this.booking.roomId)!;
    this.roomService.getRooms()
      .subscribe(data => this.rooms = data);
  }

  close(){
    this.dialogRef.close(this.success);
  }

  create() {
      this.bookingService.editBooking(this.booking.id)
        .pipe(
          tap(() => {
            this.toastr.success('Booking atualizado com sucesso!', 'Sucesso!');
            this.success = true;
            this.close();
          })
        )
        .subscribe();
  }

  getRoomById(roomId: number): Room{
    let room = this.roomService.getRoomById(roomId)
    return room
  }

  changeRoom(room:Room):void{
    this.selectedRoom = room;
    this.bookingService.ChangeRoom(this.selectedRoom);
    this.setBookingItem();
  }

  changeQuantity(room:Room, quantityInString:string){
      const quantity= parseInt(quantityInString);
      this.bookingService.changeQuantity(quantity);
      this.setBookingItem();
  }
  
  setBookingItem(){
      this.bookingItem = this.bookingService.getBookingItem();
  }

}
