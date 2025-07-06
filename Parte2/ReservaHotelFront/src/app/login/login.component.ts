import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  login(): void {
    if (!this.email || !this.password)
      return;

    this.userService.login(this.email, this.password)
      .pipe(
        tap(login => {
          this.auth.setUser(login);
          this.toastr.success('Login successful!', 'Success');

          if (login.user.isAdmin)
            this.router.navigate(['/admin']);
          else
            this.router.navigate(['/userpage']);
        }),
        catchError((err) => {
          if (err.status == 401)
            this.toastr.error('Invalid credentials', 'Error');
          else 
            this.toastr.error('Internal Error', 'Error');
          return of();
        })
      )
      .subscribe();
  }

}
