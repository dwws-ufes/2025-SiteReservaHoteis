import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../models/hotel';
import { takeUntil, switchMap, of, Subject, tap } from 'rxjs';
import { HotelService } from '../services/hotel.service';
import { BookOnlineComponent } from '../modals/book-online/book-online.component';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { BookingService } from '../services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { Booking } from '../models/booking';
import { Room } from '../models/room';


type FeatureKey = 'book' | 'rooms' | 'restaurants';

interface FeatureCard {
  key: FeatureKey;
  img: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  

  hotel!: Hotel
  private destroy$ = new Subject<void>();
  user!: User ;
  bookings: Booking[] = [];
  rooms: Room[] = [];
  features: FeatureCard[] = [
  {
    key: 'book',
    img: '/assets/imgs/restaurant/fine-dining.jpg',
    title: 'Book Online',
    description: 'Reserve your stay quickly and securely—choose dates, room type, and extras in just a few clicks.'
  },
  {
    key: 'rooms',
    img: '/assets/imgs/restaurant/buffet.jpeg',
    title: 'Our Rooms',
    description: 'Comfortable rooms and suites with Wi-Fi, climate control, and private bathrooms—find the ideal option for your trip.'
  },
  {
    key: 'restaurants',
    img: '/assets/imgs/restaurant/wine-selection.jpg',
    title: 'Our Restaurants',
    description: 'From breakfast to dinner, enjoy our on-site restaurants with à la carte and buffet options.'
  }
];
private destroyBookingCreate$ = new Subject<void>();

  constructor(
    private readonly router: Router, 
    private readonly auth: AuthService, 
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly bookingService: BookingService,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(pm => {
          const encoded = pm.get('hotelname');
          if (!encoded) {
            this.router.navigate(['/']);
            return of(null);
          }
          const name = decodeURIComponent(encoded);

          // busca exata primeiro; se não achar, tenta parcial (contém)
          return this.hotelService.getByName(name).pipe(
            switchMap(h => (h ? of(h) : this.hotelService.getByName(name, { partial: true })))
          );
        })
      )
      .subscribe({
        next: (h) => {
          if (!h) {
            // não achou nem exato nem parcial
            this.router.navigate(['/']);
            return;
          }
          this.hotel = h;
        },
        error: () => this.router.navigate(['/'])
      });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFeatureClick(key: FeatureKey): void {
  switch (key) {
    case 'book':
      this.handleBookOnline();
      break;
    case 'rooms':
      this.handleRooms();
      break;
    case 'restaurants':
      this.handleRestaurants();
      break;
  }
}

  onImgError(ev: Event) {
  (ev.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
}

  handleBookOnline(): void {
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

handleRooms(): void {
  this.router.navigate(['/rooms', encodeURIComponent(this.hotel.name)]);
}

handleRestaurants(): void {
  this.router.navigate(['/restaurantlist']);
}

  redirectToServicesList() {
    const isLogged = this.auth.isLoggedIn();

    if (!isLogged)
      this.router.navigate(['/login']);
    else
      this.router.navigate(['/services/list']);
  }
}
