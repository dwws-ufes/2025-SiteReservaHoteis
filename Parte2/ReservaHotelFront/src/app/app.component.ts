import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(user => this.user = user);
    }
  }

  redirectTo() {
    this.router.navigate(['/userpage'])
  }
}
