import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { AppRountingModule } from './app-routing.module';
import { HomePageComponent } from './homepage/homepage.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RoomCreateComponent } from './modals/room-create/room-create.component';
import { RoomEditComponent } from './modals/room-edit/room-edit.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchComponent } from './search/search.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodPageComponent } from './modals/food-page/food-page.component';
import { BookOnlineComponent } from './modals/book-online/book-online.component';
import { UserDeleteComponent } from './modals/user-delete/user-delete.component';
import { LogoutComponent } from './modals/logout/logout.component';
import { BookingEditComponent } from './modals/booking-edit/booking-edit.component';
import { UserEditComponent } from './modals/user-edit/user-edit.component';
import { CheckInComponent } from './modals/check-in/check-in.component';
import { CancelBookingComponent } from './modals/cancel-booking/cancel-booking.component';
import { PoolPageComponent } from './pool-page/pool-page.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import { AmenitiesPageComponent } from './amenities-page/amenities-page.component';
import { FoodTakeOutComponent } from './food-take-out/food-take-out.component';
import { HotelPageComponent } from './hotel-page/hotel-page.component';
import { HotelInfoComponent } from './modals/hotel-info/hotel-info.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ServicesPageComponent,
    RoomsPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    RoomCreateComponent,
    RoomEditComponent,
    UserPageComponent,
    SearchComponent,
    ServiceListComponent,
    CartPageComponent,
    FoodPageComponent,
    BookOnlineComponent,
    UserDeleteComponent,
    LogoutComponent,
    BookingEditComponent,
    UserEditComponent,
    CheckInComponent,
    CancelBookingComponent,
    PoolPageComponent,
    RestaurantPageComponent,
    AmenitiesPageComponent,
    FoodTakeOutComponent,
    HotelPageComponent,
    HotelInfoComponent,
    HotelListComponent,
    RestaurantListComponent,
    RestaurantPageComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatDialogModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
