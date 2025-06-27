import { Amenities } from "./Amenities";
import { Food } from "./Food";

export class ServiceItem{
    constructor(food:Food){
      this.food = food; 
      this.amenities = food; 
    }
    food:Food;
    amenities:Amenities;
    quantity:number = 1;

    get price():number{
        return this.food.price * this.quantity;
    }
}

export class ServiceItemAmenities{
    constructor(amenities:Amenities){ 
      this.amenities = amenities; 
    }
    amenities:Amenities;
    quantity:number = 1;

    get price():number{
        return this.amenities.price * this.quantity;
    }
}