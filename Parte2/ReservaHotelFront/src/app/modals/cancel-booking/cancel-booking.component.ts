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
  success = false;

  constructor (
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookingId: number },
    private readonly toastr: ToastrService,
    private readonly bookingService: BookingService
  ) { }

  close() {
    this.dialogRef.close(this.success);
  }

  delete() {
    this.bookingService.deleteBooking(this.data.bookingId)
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