import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Hotel } from '../models/hotel';
import { HotelService } from '../services/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { HotelInfoComponent } from '../modals/hotel-info/hotel-info.component';

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

  geocodeQuery = '';
  geocodingLoading = false;

  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];

  mapOptions: google.maps.MapOptions = {
  mapTypeControl: true,
  zoomControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  scaleControl: true,
};  

  constructor(private hotelService: HotelService, private readonly dialog: MatDialog) {}

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
    const dialog = this.dialog.open(HotelInfoComponent, {
      data:{
        hotel: h,                           
        btnSuccess: 'Edit hotel',
        btnDelete: 'Delete hotel'
      },
      width: '900px',
      maxWidth: '95vw'
    });
    
        dialog.afterClosed()
          .subscribe(success => {
            if (!success)
              return;
    
          })
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
  }

  trackByUri = (_: number, h: Hotel) => h.uri;

  geocodeAddress() {
    const query = this.geocodeQuery.trim();
    if (!query) return;

    // garante que a API JS do Maps está disponível
    if (!(window as any).google?.maps?.Geocoder) {
      console.error('Google Maps JS API ainda não carregada.');
      alert('Mapa ainda carregando. Tente novamente em alguns segundos.');
      return;
    }

    this.geocodingLoading = true;

    // Se for CEP BR, a API aceita direto como address; forçamos região BR
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: query,
        region: 'BR',
        componentRestrictions: { country: 'BR' },
      },
      (results, status) => {
        this.geocodingLoading = false;

        if (status === 'OK' && results && results.length) {
          const best = results[0];
          const loc = best.geometry.location;
          this.center = { lat: loc.lat(), lng: loc.lng() };
          this.zoom = 16;
          // opcional: destacar primeiro hotel mais próximo
          // this.currentHotel = null;
          // this.info?.close();
        } else {
          console.error('Geocode falhou:', status, results);
          alert('Não foi possível localizar esse CEP/endereço.');
        }
      }
    );
  }
}