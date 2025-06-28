import { Injectable } from '@angular/core';
import { ServiceItem, ServiceItemAmenities } from '../../shared/models/Service';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  getFoodServiceOrderByUser(client: User): ServiceItem[]{
    return this.getAllFoodsOrders().filter(order => order.client == client)
  }

  getAmenitiesServiceOrderByUser(client: User): ServiceItemAmenities[]{
    return this.getAllAmenitiesOrders().filter(order => order.client == client)
  }

  getAllFoodsOrders(): ServiceItem[] {
    return[
      
    ]
  }

  getAllAmenitiesOrders(): ServiceItemAmenities[] {
    return[

    ]
  }
}


