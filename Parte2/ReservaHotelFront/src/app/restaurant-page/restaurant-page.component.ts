import { Component, OnInit } from '@angular/core';

interface RestaurantFeature {
  img: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  restaurantFeatures: RestaurantFeature[] = [
    {
      img: '/assets/imgs/restaurant/fine-dining.jpg',
      title: 'Gastronomia de Alto Nível',
      description: 'Pratos sofisticados preparados com ingredientes frescos e sazonais.'
    },
    {
      img: '/assets/imgs/restaurant/buffet.jpeg',
      title: 'Buffet Variado',
      description: 'Estação com saladas, pratos quentes e sobremesas para todos os gostos.'
    },
    {
      img: '/assets/imgs/restaurant/wine-selection.jpg',
      title: 'Carta de Vinhos',
      description: 'Seleção premiada de vinhos nacionais e importados para harmonização.'
    },
    {
      img: '/assets/imgs/restaurant/outdoor-seating.jpg',
      title: 'Ambiente ao Ar Livre',
      description: 'Mesas externas sob pérgola, ideal para refeições ao ar livre.'
    }
  ];

  ngOnInit(): void {
  }
}