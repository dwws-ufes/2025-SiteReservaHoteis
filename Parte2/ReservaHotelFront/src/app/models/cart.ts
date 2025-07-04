import { Food } from "./food";

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

export class Cart{
    items:CartItem[] = [];

    get totalPrice(): number{
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }
}