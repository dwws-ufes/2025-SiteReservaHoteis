import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Hotel } from '../models/hotel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {
  @ViewChild('gmap') gmap?: GoogleMap;
  @ViewChild('info') info?: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: -15.7939, lng: -47.8828 }; // BR
  zoom = 4;

  query = '';
  currentHotel: Hotel | null = null;

  hotels: Hotel[] = []

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.get().subscribe({
      next: (data) => this.hotels = data,
      error: (err) => console.error('Erro ao carregar hotéis', err)
    });
}

  focusHotel(h: Hotel) {
    this.center = { lat: h.lat, lng: h.lng };
    this.zoom = 12;
    this.currentHotel = h;
  }

  openInfo(marker: MapMarker, h: Hotel) {
    this.currentHotel = h;
    this.info?.open(marker);
  }

  openDbpedia(h: Hotel) {
    window.open(h.uri, '_blank');
  }
}