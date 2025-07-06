import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly userSubject = new BehaviorSubject<User | null>(null);

  setUser(login: { user: User, token: string }) {
    this.userSubject.next(login.user);
    localStorage.setItem('login', JSON.stringify(login));
  }

  getUser(): User {
    const login = localStorage.getItem('login');
    return JSON.parse(login!).user;
  }

  getToken(): string {
    const login = localStorage.getItem('login');
    if (!login)
      return '';

    return JSON.parse(login).token;
  }

  cleanUser() {
    this.userSubject.next(null);
    localStorage.removeItem('login');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    if (!user)
      return false;

    return user.isAdmin;
  }

  isLoggedIn(): boolean {
    const login = localStorage.getItem('login');
    return !!login;
  }
}
