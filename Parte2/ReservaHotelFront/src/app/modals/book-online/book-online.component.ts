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
  selector: 'app-book-online',
  templateUrl: './book-online.component.html',
  styleUrls: ['./book-online.component.css']
})
export class BookOnlineComponent implements OnInit{

  booking!: Booking;
  bookingItem!:BookingItem;
  rooms: Room[] = []
  selectedRoom!: Room;

  success = false;

  constructor(
          
          public dialogRef: MatDialogRef<BookOnlineComponent>,
          @Inject(MAT_DIALOG_DATA) public data: {  },
          private readonly toastr: ToastrService,
          private bookingService: BookingService,
          private roomService: RoomService
    ) {
      this.setBookingItem();
      // this.booking = {
      //   id: data.booking.id,
      //   userId: data.booking.userId,
      //   price: data.booking.price,
      //   checkIn: data.booking.checkIn,
      //   checkOut: data.booking.checkOut,
      //   roomId: data.booking.roomId,
      //   roomQtd: data.booking.roomQtd,
      //   adultsNumber: data.booking.adultsNumber,
      //   childNumber: data.booking.childNumber
      // }
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
      // this.userService.editUser(this.user.id)
      //   .pipe(
      //     tap(() => {
      //       this.toastr.success('User atualizado com sucesso!', 'Sucesso!');
      //       this.success = true;
      //       this.close();
      //     })
      //   )
      //   .subscribe();
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
