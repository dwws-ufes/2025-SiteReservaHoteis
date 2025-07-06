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
      title: 'Fine Dining',
      description: 'Sophisticated dishes prepared with fresh, seasonal ingredients.'
    },
    {
      img: '/assets/imgs/restaurant/buffet.jpeg',
      title: 'Varied Buffet',
      description: 'Stations with salads, hot dishes, and desserts to suit every taste.'
    },
    {
      img: '/assets/imgs/restaurant/wine-selection.jpg',
      title: 'Wine List',
      description: 'Award-winning selection of domestic and imported wines for perfect pairing.'
    },
    {
      img: '/assets/imgs/restaurant/outdoor-seating.jpg',
      title: 'Outdoor Seating',
      description: 'Al fresco tables under a pergola, ideal for open-air dining.'
    }
  ];

  ngOnInit(): void {
  }
}