import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Booking, BookingItem } from 'src/app/models/booking';
import { Room } from 'src/app/models/room';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-online',
  templateUrl: './book-online.component.html',
  styleUrls: ['./book-online.component.css']
})
export class BookOnlineComponent implements OnInit{

  bookingItem!:BookingItem;
  rooms: Room[] = []
  selectedRoom!: Room;
  checkIn: Date = new Date;
  checkOut: Date = new Date;
  adultsNumber : number = 1
  childNumber : number = 1
  roomQtd : number = 1

  success = false;

  constructor(
          
          public dialogRef: MatDialogRef<BookOnlineComponent>,
          @Inject(MAT_DIALOG_DATA) public data: {  },
          private readonly toastr: ToastrService,
          private bookingService: BookingService,
          private roomService: RoomService,
          private userService: UserService
    ) {
      this.setBookingItem();
  }

  ngOnInit() {
    this.bookingItem.room = {
                              id: 1,
                              name: "Deluxe Room",
                              price: 350,
                              imageUrl: "/assets/img/rooms/deluxe-room.jpg",
                              description: "An elegant room with a king-size bed, floor-to-ceiling windows offering city views, and complimentary premium amenities."
                            };
    this.selectedRoom = this.bookingItem.room;
    this.roomService.getRooms()
      .subscribe(data => this.rooms = data);
  }

  close(){
    this.dialogRef.close(this.success);
  }

  create() {
    let booking = {
        userId: this.userService.getCurrentUser().id,
        price: this.bookingItem.price,
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
          })
        )
        .subscribe();
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
