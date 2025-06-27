import { Injectable } from '@angular/core';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserById(id: number): User{
    return this.getAll().find(user => user.id == id)!;
  }

  getAll(): User[] {
    return [
      {
    id: 1,
    first_name: "Erico",
    last_name: "Guedes",
    email: "erico.guedes@example.com",
    password: "Pass@1234",
    imageURL: "/assets/img/users/user1.jpg"
  },
  {
    id: 2,
    first_name: "Ana",
    last_name: "Silva",
    email: "ana.silva@example.com",
    password: "Ana2025!",
    imageURL: "/assets/img/users/user2.jpg"
  },
  {
    id: 3,
    first_name: "Carlos",
    last_name: "Oliveira",
    email: "carlos.oliveira@example.com",
    password: "CarL!234",
    imageURL: "/assets/img/users/user3.jpg"
  },
  {
    id: 4,
    first_name: "Beatriz",
    last_name: "Ferreira",
    email: "beatriz.ferreira@example.com",
    password: "Bia#2025",
    imageURL: "/assets/img/users/user4.jpg"
  },
  {
    id: 5,
    first_name: "Lucas",
    last_name: "Pereira",
    email: "lucas.pereira@example.com",
    password: "LuPe123!",
    imageURL: "/assets/img/users/user5.jpg"
  },
  {
    id: 6,
    first_name: "Mariana",
    last_name: "Costa",
    email: "mariana.costa@example.com",
    password: "Mari@2025",
    imageURL: "/assets/img/users/user6.jpg"
  }
    ]
  }
}
