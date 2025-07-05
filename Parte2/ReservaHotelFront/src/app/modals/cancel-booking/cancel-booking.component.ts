import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent { 

    booking!: Booking;
    success = false;

    constructor (
      public dialogRef: MatDialogRef<CancelBookingComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { booking: Booking },
      private readonly toastr: ToastrService,
      private bookingService: BookingService
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

  delete() {
    this.bookingService.deleteBooking(this.booking.id)
            .pipe(
              tap(() => {
                this.toastr.success('Booking Deletado com sucesso!', 'Sucesso!');
                this.success = true;
                this.close();
              })
            )
            .subscribe()
    this.close()
  }
        
}