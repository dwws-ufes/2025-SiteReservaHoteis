import { Component, EventEmitter, Input, Output, Inject, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BookOnlineComponent } from '../book-online/book-online.component';
import { EMPTY, Subject } from 'rxjs';

import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { User } from 'src/app/models/user';
import { Booking } from 'src/app/models/booking';
import { Room } from 'src/app/models/room';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.css']
})
export class HotelInfoComponent implements OnInit{
  @Output() book = new EventEmitter<Hotel>();
  @Output() more = new EventEmitter<Hotel>();
  @Input() hotel!: Hotel;
  success = false;
  user!: User ;
  bookings: Booking[] = [];
  rooms: Room[] = [];
  
    private destroyBookingCreate$ = new Subject<void>();
    private destroyBookingEdit$ = new Subject<void>();

  constructor(
      public dialogRef: MatDialogRef<HotelInfoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel, btnSuccess: string, btnDelete: string },
      private readonly toastr: ToastrService,
      private activatedRoute:ActivatedRoute,
      private readonly userService: UserService,
      private readonly roomService: RoomService,
      private readonly bookingService: BookingService,
      private readonly dialog: MatDialog,
      private router: Router) { 
      this.hotel = {
        name: data.hotel.name,
        uri: data.hotel.uri,
        lat: data.hotel.lat,
        lng: data.hotel.lng,
        city: data.hotel.city,
        country: data.hotel.country,
        thumbnail: data.hotel.thumbnail,
      }}

  ngOnInit(): void {
    this.userService.getUserProfile()
      .pipe(
        tap(user => {
          this.user = user;
          return user.id;
        }),
        switchMap(user => this.bookingService.getBookingsByUserId(user.id)),
        tap(bookings => this.bookings = bookings)
      )
      .subscribe();
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
  }

  bookOnline(): void {
      const dialog = this.dialog.open(BookOnlineComponent, {
        width: '400px',
        data: { userId: this.user.id, rooms: this.rooms }
      });
      
      dialog.afterClosed()
        .pipe(
          tap(res => {
            if (!res)
              this.destroyBookingCreate$.next();
          }),
          switchMap(() => this.bookingService.getBookingsByUserId(this.user.id)),
          tap(bookings => this.bookings = bookings),
          takeUntil(this.destroyBookingCreate$)
        )
        .subscribe()
    }
  handleMore() { 
    this.router.navigate(['/services', encodeURIComponent(this.hotel.name)]); // /services/<nome>
    this.dialogRef?.close(this.success);
  }
}


