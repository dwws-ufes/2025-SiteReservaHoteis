import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent { 

    booking!: Booking;
    success = false;

    constructor (
      public dialogRef: MatDialogRef<CheckInComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { booking: Booking },
      private readonly toastr: ToastrService
    ) {
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
      }
     }

  close() {
    this.dialogRef.close(this.success);
  }

  confirmCheckIn() {
    this.close()
  }
        
}
