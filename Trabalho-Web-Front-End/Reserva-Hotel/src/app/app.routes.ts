import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Layout/home-component/home-component';
import { RoomCoponent } from './Components/Layout/room-coponent/room-coponent';
import { RoomPageCoponent } from './Components/Layout/room-page-coponent/room-page-coponent';
import { ServiceCoponent } from './Components/Layout/service-coponent/service-coponent';
import { ServicePageCoponent } from './Components/Layout/service-page-coponent/service-page-coponent';
import { ServicePageAmenitiesComponent } from './Components/Layout/service-page-amenities-component/service-page-amenities-component';
import { ServiceListCoponent } from './Components/Layout/service-list-coponent/service-list-coponent';
import { LoginCoponent } from './Components/Auth/login-coponent/login-coponent';
import { RegisterCoponent } from './Components/Auth/register-coponent/register-coponent';
import { LogoutCoponent } from './Components/Auth/logout-coponent/logout-coponent';
import { CartPageCoponent } from './Components/Layout/cart-page-coponent/cart-page-coponent';
import { CartPageAmenitiesComponent } from './Components/Layout/cart-page-amenities-component/cart-page-amenities-component';
import { UserPageCoponent } from './Components/Layout/user-page-coponent/user-page-coponent';
import { RoomBookingComponent } from './Components/Layout/room-booking-component/room-booking-component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'rooms', component:RoomCoponent},
    {path:'rooms/roomsPage/:roomid', component:RoomPageCoponent},
    {path:'services', component:ServiceCoponent},
    {path:'services/serviceList', component:ServiceListCoponent},
    {path:'services/serviceList/:searchTerm', component:ServiceListCoponent},
    {path:'services/serviceList/tag/:tag', component:ServiceListCoponent},
    {path:'services/servicePage/:serviceid', component:ServicePageCoponent},
    {path:'services/servicePageAmenities/:serviceid', component:ServicePageAmenitiesComponent},
    {path:'login', component:LoginCoponent},
    {path:'register', component:RegisterCoponent},
    {path:'logout', component:LogoutCoponent},
    {path:'userprofile', component:UserPageCoponent},
    {path:'cartPageFood', component:CartPageCoponent},
    {path:'cartPageAmenities', component:CartPageAmenitiesComponent},
    {path:'booking', component:RoomBookingComponent},
];
