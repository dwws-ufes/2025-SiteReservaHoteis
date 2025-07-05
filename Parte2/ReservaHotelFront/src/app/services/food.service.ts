import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly apiUrl = 'https://localhost:7099/api/food'

  constructor(private readonly http: HttpClient) { }
  
  get(id?: number, searchTerm?: string, tag?: string): Observable<Food[]> {
    let filter = '';
    if (id != undefined)
      filter += `id=${id}&`;
    if (searchTerm != undefined)
      filter += `name=${searchTerm}&`;
    if (tag != undefined)
      filter += `tag=${tag}`;

    return this.http.get<Food[]>(`${this.apiUrl}?${filter}`);
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag == "All" ?
      this.getAll() :
      this.getAll().filter(food => food.tags?.includes(tag));
  }

  getAll(): Food[] {
    return [
      {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        // favorite: false,
        origins: ['italy'],
        // stars: 4.5,
        imageUrl: '/assets/imgs/foods/food-1.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
      {
        id: 2,
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        // favorite: true,
        origins: ['persia', 'middle east', 'china'],
        // stars: 4.7,
        imageUrl: '/assets/imgs/foods/food-2.jpg',
        tags: ['SlowFood', 'Lunch'],
      },
      {
        id: 3,
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        // favorite: false,
        origins: ['germany', 'us'],
        // stars: 3.5,
        imageUrl: '/assets/imgs/foods/food-3.jpg',
        tags: ['FastFood', 'Hamburger'],
      },
      {
        id: 4,
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        // favorite: true,
        origins: ['belgium', 'france'],
        // stars: 3.3,
        imageUrl: '/assets/imgs/foods/food-4.jpg',
        tags: ['FastFood', 'Fry'],
      },
      {
        id: 5,
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        // favorite: false,
        origins: ['india', 'asia'],
        // stars: 3.0,
        imageUrl: '/assets/imgs/foods/food-5.jpg',
        tags: ['SlowFood', 'Soup'],
      },
      {
        id: 6,
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        // favorite: false,
        origins: ['italy'],
        // stars: 4.0,
        imageUrl: '/assets/imgs/foods/food-6.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
    ];
  }
}