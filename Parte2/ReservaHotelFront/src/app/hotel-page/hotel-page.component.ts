import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent {
  @ViewChild('gmap') gmap?: GoogleMap;
  @ViewChild('info') info?: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: -15.7939, lng: -47.8828 }; // BR
  zoom = 4;

  query = '';
  currentHotel: Hotel | null = null;

  hotels: Hotel[] = [
    { name: 'Copacabana Palace', uri: 'https://dbpedia.org/resource/Copacabana_Palace', city: 'Rio de Janeiro - RJ', lat: -22.967, lng: -43.182 },
    { name: 'Hotel Unique', uri: 'https://dbpedia.org/resource/Hotel_Unique', city: 'São Paulo - SP', lat: -23.588, lng: -46.664 },
    { name: 'Belmond Hotel das Cataratas', uri: 'https://dbpedia.org/resource/Belmond_Hotel_das_Cataratas', city: 'Foz do Iguaçu - PR', lat: -25.695, lng: -54.438 },
    { name: 'Copas Verdes Hotel (mock)', uri: 'https://dbpedia.org/resource/Fictional_Hotel', city: 'Vitória - ES', lat: -20.3155, lng: -40.3128 },
    { name: 'Hotel Glória (RJ)', uri: 'https://dbpedia.org/resource/Hotel_Glória', city: 'Rio de Janeiro - RJ', lat: -22.927, lng: -43.174 },
  ];

  get filtered(): Hotel[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.hotels;
    return this.hotels.filter(h =>
      h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
    );
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