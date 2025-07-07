import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserCreate } from '../models/user';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.url}/api/user`;

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: UserCreate): Observable<void> {
    return this.http.post<void>(this.apiUrl, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`this.apiUrl/${id}`);
  }

  editUser(id: string) {
    //return null;
  }

  login(email: string, password: string): Observable<{ user: User, token: string}> {
    return this.http.post<{ user: User, token: string}>(`${this.apiUrl}/login`, { email, password });
  }

  getUserProfile(): Observable<User> {
    const token = this.auth.getToken();
    if (!token)
      return of();
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}
