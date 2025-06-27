import { Injectable } from '@angular/core';
import { Room } from '../../shared/models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  getRoomById(id: number): Room{
      return this.getAll().find(room => room.id == id)!;
    }

  getAll(): Room[]{
    return [
  {
    id: 1,
    name: "Deluxe Room",
    price: 350,
    imageUrl: "/assets/img/rooms/deluxe-room.jpg",
    description: "An elegant room with a king-size bed, floor-to-ceiling windows offering city views, and complimentary premium amenities."
  },
  {
    id: 2,
    name: "Executive Suite",
    price: 600,
    imageUrl: "/assets/img/rooms/executive-suite.jpg",
    description: "Spacious 55 m² suite featuring a separate living area, work desk, minibar, and access to the Executive Lounge."
  },
  {
    id: 3,
    name: "Presidential Suite",
    price: 1200,
    imageUrl: "/assets/img/rooms/presidential-suite.jpg",
    description: "Luxurious 120 m² suite with a private dining room, home office, marble bathroom with whirlpool tub, and personalized butler service."
  },
  {
    id: 4,
    name: "Penthouse Suite",
    price: 2500,
    imageUrl: "/assets/img/rooms/penthouse-suite.jpg",
    description: "Top-floor penthouse with a panoramic rooftop terrace, plunge pool, and dedicated concierge for 24/7 service."
  },
  {
    id: 5,
    name: "Villa Private",
    price: 3800,
    imageUrl: "/assets/img/rooms/villa-private.jpg",
    description: "Standalone villa featuring a private garden, heated infinity pool, and on-call personal chef for bespoke dining experiences."
  },
  {
    id: 6,
    name: "Royal Palace Suite",
    price: 7500,
    imageUrl: "/assets/img/rooms/royal-palace-suite.jpg",
    description: "Sumptuous suite inspired by classic palace décor, with grand reception room, private wine cellar, and helipad access."
  }
];
  }
}
