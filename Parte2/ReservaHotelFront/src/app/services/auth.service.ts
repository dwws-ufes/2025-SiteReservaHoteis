import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  user$: Observable<User | null> = this.userSubject.asObservable();

  setUser(login: { user: User, token: string }) {
    this.userSubject.next(login.user);
    localStorage.setItem('token', login.token);
  }

  cleanUser() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
