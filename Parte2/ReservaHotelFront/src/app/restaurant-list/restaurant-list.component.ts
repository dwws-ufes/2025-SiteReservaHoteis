import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { tap } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = []

  constructor(private restaurantService: RestaurantService, private router: Router) {}
  
  ngOnInit() {
    this.restaurantService.get().pipe(
        tap(restaurants => this.restaurants = restaurants)
      )
      .subscribe()
  
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/Rest.jpg';
  }

  handleMore(restaurant: Restaurant) { 
      this.router.navigate(['/services/list', encodeURIComponent(restaurant.name)]);
    }
}