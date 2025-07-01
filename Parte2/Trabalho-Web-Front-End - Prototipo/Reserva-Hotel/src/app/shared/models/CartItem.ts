import { Amenities } from "./Amenities";
import { Food } from "./Food";

export class CartItem{
    constructor(food:Food){
      this.food = food; 
    }
    food:Food;
    quantity:number = 1;

    get price():number{
        return this.food.price * this.quantity;
    }
}

export class CartItemAmenities{
    constructor(amenities:Amenities){ 
      this.amenities = amenities; 
    }
    amenities:Amenities;
    quantity:number = 1;

    get price():number{
        return this.amenities.price * this.quantity;
    }
}