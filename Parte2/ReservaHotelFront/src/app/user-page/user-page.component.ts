import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { BookOnlineComponent } from '../modals/book-online/book-online.component';
import { LogoutComponent } from '../modals/logout/logout.component';
import { UserDeleteComponent } from '../modals/user-delete/user-delete.component';
import { BookingEditComponent } from '../modals/booking-edit/booking-edit.component';
import { RoomEditComponent } from '../modals/room-edit/room-edit.component';
import { UserEditComponent } from '../modals/user-edit/user-edit.component';
import { User } from '../models/user';
import { CheckInComponent } from '../modals/check-in/check-in.component';
import { UserService } from '../services/user.service';
import { CancelBookingComponent } from '../modals/cancel-booking/cancel-booking.component';
import { Booking } from '../models/booking';
import { Service } from '../models/service';
import { BookingService } from '../services/booking.service';
import { ServiceService } from '../services/service.service';
import { RoomService } from '../services/room.service';
import { FoodService } from '../services/food.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  user!: User ;
  bookings: Booking[] = [];
  services: Service[] = [];

  options = [
    'Book Online',
    'Services',
    'Your Cart',
    'Edit Profile',
    'Delete Account',
    'Logout'
  ];

  constructor(  private route: ActivatedRoute, 
                private readonly dialog: MatDialog,
                private router: Router,
                private userService: UserService,
                private bookingService: BookingService,
                private serviceService: ServiceService,
                public roomService: RoomService,
                public foodService: FoodService
              ) { }
  
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.bookings = this.bookingService.getBookingsByUserId(this.user.id);
    this.services = this.serviceService.getServicesByUserId(this.user.id);
  }

  onOptionClick(option: string): void {
    switch (option) {
      case 'Book Online':
        this.bookOnline();
        break;
      case 'Services':
        this.servicePage();
        break;
      case 'Your Cart':
        this.yourCart();
        break;
      case 'Edit Profile':
        this.editProfile(this.user);
        break;
      case 'Delete Account':
        this.deleteAccount(this.user);
        break;
      case 'Logout':
        this.logout();
        break;
      default:
        console.warn('Unknown option clicked:', option);
    }
  }

  bookOnline(): void {
    const dialog = this.dialog.open(BookOnlineComponent, {
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  servicePage(): void {
    this.router.navigateByUrl('/services');
  }

  yourCart(): void {
    this.router.navigateByUrl('/cartpagefood');
  }

  editProfile(user : User): void {
    const dialog = this.dialog.open(UserEditComponent, {
            data: {user},
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  deleteAccount(user : User): void {
    const dialog = this.dialog.open(UserDeleteComponent, {
            data: {user},
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  logout(): void {
    const dialog = this.dialog.open(LogoutComponent, {
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  editBooking(booking: Booking): void {
    const dialog = this.dialog.open(BookingEditComponent, {
            data: {booking},
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  cancelBooking(booking: Booking): void {
    const dialog = this.dialog.open(CancelBookingComponent, {
            data: {booking},
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }

  checkIn(booking: Booking): void {
    const dialog = this.dialog.open(CheckInComponent, {
            data: {booking},
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }
}
