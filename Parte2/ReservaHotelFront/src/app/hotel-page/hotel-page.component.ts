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

  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];

  mapOptions: google.maps.MapOptions = {
  mapTypeControl: true,
  zoomControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  scaleControl: true,
};  

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
  this.hotelService.get().subscribe({
    next: (data) => {
      this.hotels = data ?? [];
      this.filteredHotels = this.hotels.slice();
      this.applyFilter(); // garante estado inicial
    },
    error: (err) => console.error('Erro ao carregar hotéis', err)
  });
}

  private normalize(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')              // separa acentos
    .replace(/\p{Diacritic}/gu, ''); // remove acentos
}

applyFilter() {
  const q = this.normalize(this.query.trim());
  if (!q) {
    this.filteredHotels = this.hotels.slice();
    return;
  }

  this.filteredHotels = this.hotels.filter(h => {
    const tokens = [
      this.normalize(h.name),
      this.normalize(h.city ?? ''),
      this.normalize(h.country ?? ''),
      this.normalize(h.uri ?? '')
    ];
    return tokens.some(v => v.includes(q));
  });
}

  focusHotel(h: Hotel) {
    this.center = { lat: h.lat, lng: h.lng };
    this.zoom = 15;
    this.currentHotel = h;
  }

  openInfo(marker: MapMarker, h: Hotel) {
    this.currentHotel = h;
    this.info?.open(marker);
  }

  openDbpedia(h: Hotel) {
    window.open(h.homepage || h.uri, '_blank');
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
  }

  trackByUri = (_: number, h: Hotel) => h.uri;
}