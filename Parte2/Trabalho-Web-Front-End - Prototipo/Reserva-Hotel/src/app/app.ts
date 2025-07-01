import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/Main/header-component/header-component';
import { FooterComponent } from './Components/Main/footer-component/footer-component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Reserva-Hotel';
  constructor(public router: Router) {}

  shouldShowLayout(): boolean {
    const hiddenRoutes = ['/login', '/register', '/forgot'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
