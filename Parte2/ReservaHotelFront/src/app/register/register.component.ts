import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {}

  public register(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password)
      return;

    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }

    this.userService.createUser(user)
      .pipe(
        tap(() => {
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso')
          this.router.navigate(['/login'])
        })
      )
      .subscribe();
  }
}
