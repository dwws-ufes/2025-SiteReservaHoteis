import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
          this.toastr.success('Login feito com sucesso!', 'Sucesso');
          localStorage.setItem('token', login.token);

          this.auth.setUser(login.user);
          this.router.navigate(['/userpage']);
        })
      )
      .subscribe();
  }

}
