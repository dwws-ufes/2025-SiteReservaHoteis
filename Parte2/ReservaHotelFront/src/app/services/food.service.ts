import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly apiUrl = 'https://localhost:7099/api/food'

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) { }
  
  get(id?: number, searchTerm?: string, tag?: string): Observable<Food[]> {
    let filter = '';
    if (id != undefined)
      filter += `id=${id}&`;
    if (searchTerm != undefined)
      filter += `name=${searchTerm}&`;
    if (tag != undefined)
      filter += `tag=${tag}`;
    return this.http.get<Food[]>(`${this.apiUrl}?${filter}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}