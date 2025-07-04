import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCreate } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://localhost:7099/api/user'

  constructor(private readonly http: HttpClient) { }

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

  logout() {
    
  }
}
