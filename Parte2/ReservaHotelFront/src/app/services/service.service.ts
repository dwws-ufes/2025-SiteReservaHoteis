import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Service, ServiceCreate } from '../models/service';
import { FoodService } from './food.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    private readonly apiUrl = 'https://localhost:7099/api/user'

    constructor( private readonly http: HttpClient) {}

    getServicesByUserId(userId: string): Service[] {
        let Service: Service[] = [];
        this.getServices()
            .pipe(map(Service => Service.filter(r => r.userId === userId)))
            .subscribe(arr => Service = arr);
        return Service;
    }     

    getServices(): Observable<Service[]> {
        return of(this.getAll());
        //return this.http.get<Service[]>(this.apiUrl);
    }

    createService(service: ServiceCreate): Observable<Service>{
        return this.http.get<Service>(this.apiUrl);
    }

    editService(serviceid:number): Observable<Service>{
        return this.http.get<Service>(this.apiUrl);
    }

    deleteService(serviceid:number): Observable<Service>{
        return this.http.get<Service>(this.apiUrl);
    }

    getAll(): Service[] {
        return [
        {
            "id": 201,
            "userId": "1",
            "totalprice": 75,
            "itens": [
            { "food": "Room Cleaning", "quantity": 1 },
            { "food": "Breakfast Service", "quantity": 2 }
            ],
            "deliveryTime": "2025-07-10T08:00:00Z",
            "status": "delivered"
        },
        {
            "id": 202,
            "userId": "1",
            "totalprice": 120,
            "itens": [
            { "food": "Laundry Service", "quantity": 2 },
            { "food": "Mini Bar Restock", "quantity": 1 }
            ],
            "deliveryTime": "2025-07-11T14:30:00Z",
            "status": "delivered"
        },
        {
            "id": 203,
            "userId": "1",
            "totalprice": 50,
            "itens": [
            { "food": "Spa Voucher", "quantity": 1 }
            ],
            "deliveryTime": "2025-07-12T10:00:00Z",
            "status": "delivered"
        },
        {
            "id": 204,
            "userId": "1",
            "totalprice": 90,
            "itens": [
            { "food": "Airport Transfer", "quantity": 1 },
            { "food": "Airport Transfer", "quantity": 1 },
            { "food": "Airport Transfer", "quantity": 1 },
            { "food": "Airport Transfer", "quantity": 1 },
            { "food": "Airport Transfer", "quantity": 1 },
            { "food": "Airport Transfer", "quantity": 1 }
            ],
            "deliveryTime": "2025-07-09T18:00:00Z",
            "status": "pending"
        }
    ]

    }
}