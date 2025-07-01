import { CartItem, CartItemAmenities } from "./CartItem";

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

export class CartAmenities{
    itemsAmenitites:CartItemAmenities[] = [];

    get totalPrice(): number{
        let totalPrice = 0;
        this.itemsAmenitites.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }
}