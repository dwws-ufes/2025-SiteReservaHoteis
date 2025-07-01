import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | null = null;

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {
    this.auth.user$
      .pipe(
        tap(user => this.user = user)
      )
      .subscribe()
  }
}
