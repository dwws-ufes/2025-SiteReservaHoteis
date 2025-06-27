import { Injectable } from '@angular/core';
import { Amenities } from '../../shared/models/Amenities';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor() { }

  getAmenitiesById(id: number): Amenities{
      return this.getAll().find(amanities => amanities.id == id)!;
    }
    
    getAllAmenitiesBySearchTerm(searchTerm:string) :Amenities[]{
      return  this.getAll().filter(amanities =>
        amanities.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

  getAll(): Amenities[]{
    return [
      {
    id: 1,
    name: "Spa Access",
    price: 120,
    favorite: true,
    stars: 5,
    imageUrl: "/assets/img/amenities/spa-access.jpg"
  },
  {
    id: 2,
    name: "Airport Transfer",
    price: 60,
    favorite: false,
    stars: 4,
    imageUrl: "/assets/img/amenities/airport-transfer.jpg"
  },
  {
    id: 3,
    name: "Breakfast Buffet",
    price: 35,
    favorite: true,
    stars: 5,
    imageUrl: "/assets/img/amenities/breakfast-buffet.jpg"
  },
  {
    id: 4,
    name: "Fitness Center",
    price: 0,
    favorite: false,
    stars: 4,
    imageUrl: "/assets/img/amenities/fitness-center.jpg"
  },
  {
    id: 5,
    name: "Laundry Service",
    price: 25,
    favorite: false,
    stars: 3,
    imageUrl: "/assets/img/amenities/laundry-service.jpg"
  },
  {
    id: 6,
    name: "Concierge Service",
    price: 45,
    favorite: true,
    stars: 5,
    imageUrl: "/assets/img/amenities/concierge-service.jpg"
  }
    ]
  }
}
