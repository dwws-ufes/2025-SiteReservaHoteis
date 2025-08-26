import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BookOnlineComponent } from '../modals/book-online/book-online.component';
import { LogoutComponent } from '../modals/logout/logout.component';
import { UserDeleteComponent } from '../modals/user-delete/user-delete.component';
import { BookingEditComponent } from '../modals/booking-edit/booking-edit.component';
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
import { Room } from '../models/room';
import { EMPTY, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  user!: User ;
  bookings: Booking[] = [];
  services: Service[] = [];
  rooms: Room[] = [];
  downloading = false;

  private destroyBookingCreate$ = new Subject<void>();
  private destroyBookingEdit$ = new Subject<void>();

  options = [
    'Book Online',
    'Take-Out',
    'Your Cart',
    'Edit Profile',
    'Download Booking',
    'Delete Account',
    'Logout'
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService,
    private readonly roomService: RoomService,
    private readonly serviceService: ServiceService
  ) { }
  
  ngOnInit(): void {
    this.userService.getUserProfile()
      .pipe(
        tap(user => {
          this.user = user;
          return user.id;
        }),
        switchMap(user => this.bookingService.getBookingsByUserId(user.id)),
        tap(bookings => this.bookings = bookings),
        switchMap(() => this.serviceService.getServicesByUserId(this.user.id)),
        tap(services => this.services = services)
      )
      .subscribe();
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  onOptionClick(option: string): void {
    switch (option) {
      case 'Book Online':
        this.bookOnline();
        break;
      case 'Take-Out':
        this.servicePage();
        break;
      case 'Your Cart':
        this.yourCart();
        break;
      case 'Edit Profile':
        this.editProfile(this.user);
        break;
      case 'Download Booking':
        this.downloadRdfTurtle();
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
    this.router.navigate(['/hotel']);
  }

  servicePage(): void {
    this.router.navigate(['/restaurantlist']);
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
      .pipe(
        tap(success => {
          if (!success){
            this.toastr.error('Logout error');
            return;
          }

          this.toastr.success('Successful logout', 'Success!');
          this.router.navigate(['']);
        })
      )
      .subscribe()
  }

  editBooking(booking: Booking): void {
    const dialog = this.dialog.open(BookingEditComponent, {
      data: { booking, rooms: this.rooms },
      width: '400px',
    });
    
    dialog.afterClosed()
      .pipe(
        tap(res => {
          if (!res)
            this.destroyBookingEdit$.next();
        }),
        switchMap(() => this.bookingService.getBookingsByUserId(this.user.id)),
        tap(bookings => this.bookings = bookings),
        takeUntil(this.destroyBookingEdit$)
      )
      .subscribe()
  }

  cancelBooking(booking: Booking): void {
    const dialog = this.dialog.open(CancelBookingComponent, {
      data: { bookingId: booking.id },
      width: '400px',
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

  downloadRdfTurtle(): void {
    if (!this.user.id) { alert('Informe o UserId'); return; }

    this.downloading = true;
    this.bookingService.getBookingsTurtle(this.user.id).subscribe({
      next: (ttl: string) => {
        const blob = new Blob([ttl], { type: 'text/turtle;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${this.user.id}.ttl`;
        a.click();

        URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: () => { this.downloading = false; }
    });
  }
}
