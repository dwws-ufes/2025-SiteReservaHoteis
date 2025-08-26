import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap, Subject, takeUntil } from 'rxjs';
import { Hotel } from '../models/hotel';
import { FormControl } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { HotelInfoComponent } from '../modals/hotel-info/hotel-info.component';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit, OnDestroy {
  @ViewChild('gmap') gmap?: GoogleMap;
  @ViewChild('info') info?: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: -15.7939, lng: -47.8828 }; // BR
  zoom = 6;

  searchCtrl = new FormControl<string>('');
  loading = false;
  private destroy$ = new Subject<void>();

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
        this.applyFilter(); 
      },
      error: (err) => console.error('Erro ao carregar hotéis', err)
    });

 
    this.searchCtrl.valueChanges.pipe(
      startWith(''),             
      debounceTime(350),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(q => {
        const term = (q ?? '').trim();
        return term
          ? this.hotelService.searchByName(term)     
          : this.hotelService.get({ force: true });  
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (list) => {
        this.filteredHotels = list ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('[HotelPage] erro na busca', err);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private normalize(s: string) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')              
      .replace(/\p{Diacritic}/gu, '');
  }

  onSearch(): void {
    const term = (this.searchCtrl.value ?? '').trim();
    this.loading = true;
    const src$ = term
      ? this.hotelService.searchByName(term)
      : this.hotelService.get({ force: true });

    src$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (list) => {
        this.filteredHotels = list ?? [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
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

    dialog.afterClosed().subscribe(success => {
      if (!success) return;
    });
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/hotel.png';
  }

  trackByUri = (_: number, h: Hotel) => h.uri || h.name;

  geocodeAddress() {
    const query = this.geocodeQuery.trim();
    if (!query) return;

    if (!(window as any).google?.maps?.Geocoder) {
      console.error('Google Maps JS API ainda não carregada.');
      alert('Mapa ainda carregando. Tente novamente em alguns segundos.');
      return;
    }

    this.geocodingLoading = true;
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
        } else {
          console.error('Geocode falhou:', status, results);
          alert('Não foi possível localizar esse CEP/endereço.');
        }
      }
    );
  }
}
