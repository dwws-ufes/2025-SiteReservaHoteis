import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../../services/booking/booking-service';
import { ServiceService } from '../../../services/service/service-service';
import { Food } from '../../../shared/models/Food';
import { ServiceItem, ServiceItemAmenities } from '../../../shared/models/Service';
import { Booking } from '../../../shared/models/Booking';
import { UserService } from '../../../services/user/user-service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-user-page-coponent',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-page-coponent.html',
  styleUrl: './user-page-coponent.css'
})
export class UserPageCoponent implements OnInit {

  foods: ServiceItem[] = [];
  amenities: ServiceItemAmenities[] = [];
  bookings: Booking[] = [];
  userId: number = 0;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private bookingService: BookingService, 
    private serviceService: ServiceService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(pm => {
      const userId = Number(pm.get('userid'));
      // this.userId = userId
      // if (!userId) {
      //   this.router.navigate(['/']);
      //   return;
      // }
    });

    this.activatedRoute.params.subscribe(params => {
        this.foods = this.serviceService.getFoodServiceOrderByUser(this.userService.getUserById(this.userId));
        this.amenities = this.serviceService.getAmenitiesServiceOrderByUser(this.userService.getUserById(this.userId));
        this.bookings = this.bookingService.getBookingsByUser(this.userService.getUserById(this.userId));
    })
  }

  showUserEditModal  = false;
  editFirstName = '';
  editLastName = '';
  editEmail = '';
  editNickname = '';

  openUserEditModal() {
    // this.editFirstName = user.first_name;
    // this.editLastName  = user.last_name;
    // this.editEmail     = user.email;
    this.showUserEditModal = true;
  }

  closeUserEditModal() {
    this.showUserEditModal  = false;
  }

  saveUserChanges() {
    this.closeUserEditModal();
  }

  showLogoutModal = false;

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.closeLogoutModal();
  }

  showBookingModal = false;

  openBookingModal() {
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
  }

  showUserDeleteModal = false;

  openUserDeleteModal() {
    this.showUserDeleteModal = true;
  }

  closeUserDeleteModal() {
    this.showUserDeleteModal = false;
  }
}
