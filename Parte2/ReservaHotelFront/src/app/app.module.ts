import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

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
    RoomEditComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
