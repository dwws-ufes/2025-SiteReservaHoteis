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

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'services/list', component: ServiceListComponent },
    { path: 'services/list/:searchTerm', component: ServiceListComponent },
    { path: 'cartpagefood', component: CartPageComponent },
    { path: 'rooms', component: RoomsPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: 'userpage', component: UserPageComponent },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRountingModule { }