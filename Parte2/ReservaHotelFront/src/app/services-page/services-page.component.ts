import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  constructor(private readonly router: Router, private readonly auth: AuthService) { }

  ngOnInit(): void {
  }

  redirectToServicesList() {
    const isLogged = this.auth.isLoggedIn();

    if (!isLogged)
      this.router.navigate(['/login']);
    else
      this.router.navigate(['/services/list']);
  }
}
