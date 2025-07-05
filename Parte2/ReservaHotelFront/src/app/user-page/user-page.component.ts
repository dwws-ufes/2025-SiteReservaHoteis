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

interface Booking {
  title: string;
  description: string;
  image: string;
  by: string;
  date: string;
  status: string;
}

interface ServiceItem {
  icon: string;
  items: string[];
  category: string;
  timeRange: string;
  status: string;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  user: User = {
    id: '1',
    firstName: 'Clifford',
    lastName: 'Frazier',
    email: 'email-exemple@exemple.com',
    password: '1234',
    avatar: 'assets/imgs/User_Icon.jpg'
  };

  options = [
    'Book Online',
    'Services',
    'Your Cart',
    'Edit Profile',
    'Delete Account',
    'Logout'
  ];

  bookings: Booking[] = [
    {
      title: 'Penthouse Suite',
      description: 'Cobertura de luxo com terraço panorâmico, piscina privativa e serviço de mordomo 24 h.',
      image: 'assets/booking1.jpg',
      by: 'Clifford Frazier',
      date: 'Feb 28, 2020',
      status: 'CHECK-IN'
    },
    {
      title: 'Presidential Suite',
      description: 'Suíte espaçosa (120 m²) com sala de jantar, escritório privativo e banheira de hidromassagem.',
      image: 'assets/booking2.jpg',
      by: 'Clifford Frazier',
      date: 'Feb 28, 2020',
      status: 'CHECK-IN'
    },
    {
      title: 'Deluxe Room',
      description: 'Quarto elegante com vista para a cidade, cama king-size, amenidades de cortesia premium.',
      image: 'assets/booking3.jpg',
      by: 'Clifford Frazier',
      date: 'Feb 28, 2020',
      status: 'CHECK-IN'
    }
  ];

  services: ServiceItem[] = [
    {
      icon: 'assets/icons/food.png',
      items: ['4 Donuts', '1 1.5 mls Coke', '1 Chocolate Cake'],
      category: 'Food and Take-out',
      timeRange: '20:45 - 20:55',
      status: 'ARRIVED'
    },
    {
      icon: 'assets/icons/amenities.png',
      items: ['Room Cleaning', 'Bathroom Refreshment', 'New Towels'],
      category: 'Amenities',
      timeRange: '20:35 - 20:45',
      status: 'ARRIVED'
    },
    {
      icon: 'assets/icons/food.png',
      items: ['2 Hamburguer', '2 French-Frys'],
      category: 'Food and Take-out',
      timeRange: '20:25 - 20:35',
      status: 'ARRIVED'
    }
  ];

  constructor( private route: ActivatedRoute, private readonly dialog: MatDialog, private router: Router) { }
  
  ngOnInit(): void {
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
            width: '400px',
          });
      
          dialog.afterClosed()
            .subscribe(success => {
              if (!success)
                return;
            })
  }
}
