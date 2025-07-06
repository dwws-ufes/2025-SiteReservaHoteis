import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    this.verifyLogin();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.verifyLogin());
  }

  verifyLogin() {
    if (!this.auth.isLoggedIn())
      this.user = null;
    
    this.userService.getUserProfile().subscribe(user => this.user = user);
  }

  redirectTo() {
    this.router.navigate(['/userpage'])
  }
}
