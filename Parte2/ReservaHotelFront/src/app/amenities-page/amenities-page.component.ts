import { Component, OnInit } from '@angular/core';

interface AmenityFeature {
  img: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-amenities-page',
  templateUrl: './amenities-page.component.html',
  styleUrls: ['./amenities-page.component.css']
})
export class AmenitiesPageComponent implements OnInit {
  amenitiesFeatures: AmenityFeature[] = [
    {
      img: '/assets/imgs/amenities/fitness-center.jpg',
      title: 'Fitness Center',
      description: 'State-of-the-art equipment for cardiovascular and strength training.'
    },
    {
      img: '/assets/imgs/amenities/spa.jpg',
      title: 'Spa & Wellness',
      description: 'Relaxing treatments and therapies to revitalize body and mind.'
    },
    {
      img: '/assets/imgs/amenities/business-center.jpg',
      title: 'Business Center',
      description: 'Room equipped with computers, printers, and high-speed internet.'
    },
    {
      img: '/assets/imgs/amenities/laundry.jpg',
      title: 'Laundry Service',
      description: 'Express wash and press service for your convenience.'
    }
  ];

  ngOnInit(): void {
  
  }
}

