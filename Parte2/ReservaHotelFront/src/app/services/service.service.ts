import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service, ServiceCreate } from '../models/service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    private readonly apiUrl = 'https://localhost:7099/api/service'

    constructor(private readonly http: HttpClient, private readonly auth: AuthService) {}

    getServicesByUserId(userId: string): Observable<Service[]> {
        return this.http.get<Service[]>(`${this.apiUrl}/${userId}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }

    createService(service: ServiceCreate): Observable<void>{
        return this.http.post<void>(this.apiUrl, service, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }

    deleteService(serviceid:number): Observable<Service>{
        return this.http.delete<Service>(`${this.apiUrl}/${serviceid}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }

    // getAll(): Service[] {
    //     return [
    //     {
    //         "id": 201,
    //         "userId": "1",
    //         "totalprice": 75,
    //         "itens": [
    //         { "food": "Room Cleaning", "quantity": 1 },
    //         { "food": "Breakfast Service", "quantity": 2 }
    //         ],
    //         "deliveryTime": "2025-07-10T08:00:00Z",
    //         "status": "delivered"
    //     },
    //     {
    //         "id": 202,
    //         "userId": "1",
    //         "totalprice": 120,
    //         "serviceItems": [
    //         { "food": "Laundry Service", "quantity": 2 },
    //         { "food": "Mini Bar Restock", "quantity": 1 }
    //         ],
    //         "deliveryTime": "2025-07-11T14:30:00Z",
    //         "status": "delivered"
    //     },
    //     {
    //         "id": 203,
    //         "userId": "1",
    //         "totalprice": 50,
    //         "serviceItems": [
    //         { "food": "Spa Voucher", "quantity": 1 }
    //         ],
    //         "deliveryTime": "2025-07-12T10:00:00Z",
    //         "status": "delivered"
    //     },
    //     {
    //         "id": 204,
    //         "userId": "1",
    //         "totalprice": 90,
    //         "serviceItems": [
    //         { "food": "Airport Transfer", "quantity": 1 },
    //         { "food": "Airport Transfer", "quantity": 1 },
    //         { "food": "Airport Transfer", "quantity": 1 },
    //         { "food": "Airport Transfer", "quantity": 1 },
    //         { "food": "Airport Transfer", "quantity": 1 },
    //         { "food": "Airport Transfer", "quantity": 1 }
    //         ],
    //         "deliveryTime": "2025-07-09T18:00:00Z",
    //         "status": "pending"
    //     }
    // ]

    // }
}