import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { tap } from 'rxjs/operators';
import { Hotel } from '../models/hotel';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels: Hotel[] = []

  constructor(private hotelService: HotelService, private router: Router) {}
  
  ngOnInit() {
    this.hotelService.get().pipe(
        tap(hotels => this.hotels = hotels)
      )
      .subscribe()
  
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
  }

  handleMore(hotel: Hotel) { 
    this.router.navigate(['/services', encodeURIComponent(hotel.name)]);
  }
}
