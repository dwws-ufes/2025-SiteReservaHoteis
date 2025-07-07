import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServicesPageComponent } from "./services-page/services-page.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { HomePageComponent } from "./homepage/homepage.component";
import { RoomsPageComponent } from "./rooms-page/rooms-page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { PoolPageComponent } from "./pool-page/pool-page.component";
import { RestaurantPageComponent } from "./restaurant-page/restaurant-page.component";
import { AmenitiesPageComponent } from "./amenities-page/amenities-page.component";
import { FoodTakeOutComponent } from "./food-take-out/food-take-out.component";
import { adminGuard } from "./admin.guard";
import { authGuard } from "./auth.guard";

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'pool', component: PoolPageComponent },
    { path: 'restaurant', component: RestaurantPageComponent },
    { path: 'amenities', component: AmenitiesPageComponent },
    { path: 'foodtakeout', component: FoodTakeOutComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'services/list', component: ServiceListComponent, canActivate: [authGuard] },
    { path: 'services/list/:searchTerm', component: ServiceListComponent, canActivate: [authGuard] },
    { path: 'cartpagefood', component: CartPageComponent, canActivate: [authGuard] },
    { path: 'rooms', component: RoomsPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPageComponent, canActivate: [adminGuard] },
    { path: 'userpage', component: UserPageComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
    })],
    exports: [RouterModule]
})
export class AppRountingModule { }