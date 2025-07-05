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
      title: 'Academia Completa',
      description: 'Equipamentos de última geração para treinos cardiovasculares e de força.'
    },
    {
      img: '/assets/imgs/amenities/spa.jpg',
      title: 'Spa & Bem-Estar',
      description: 'Tratamentos relaxantes e terapias para revitalizar corpo e mente.'
    },
    {
      img: '/assets/imgs/amenities/business-center.jpg',
      title: 'Business Center',
      description: 'Sala equipada com computadores, impressoras e internet de alta velocidade.'
    },
    {
      img: '/assets/imgs/amenities/laundry.jpg',
      title: 'Serviço de Lavanderia',
      description: 'Lavagem e passagem expressa para sua conveniência.'
    }
  ];

  ngOnInit(): void {
  
  }
}

