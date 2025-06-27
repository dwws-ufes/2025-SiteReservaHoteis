import { Injectable } from '@angular/core';
import { Cart, CartAmenities } from '../../shared/models/Cart';
import { CartItem, CartItemAmenities } from '../../shared/models/CartItem';
import { Food } from '../../shared/models/Food';
import { Amenities } from '../../shared/models/Amenities';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private cartAmenities:CartAmenities = new CartAmenities();
  
  addToCart(food: Food):void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem){
      this.changeQuantity(food.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(food));
  }

  removeFromCart(foodId:number): void{
    this.cart.items = 
    this.cart.items.filter(item => item.food.id != foodId);
  }

  changeQuantity(foodId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  addAmenitesToCart(food: Amenities):void{
    let cartItem = this.cartAmenities.itemsAmenitites.find(item => item.amenities.id === food.id);
    if(cartItem){
      this.changeQuantityOfAmenities(food.id, cartItem.quantity + 1);
      return;
    }
    this.cartAmenities.itemsAmenitites.push(new CartItemAmenities(food));
  }

  removeAmenitiesFromCart(foodId:number): void{
    this.cartAmenities.itemsAmenitites = 
    this.cartAmenities.itemsAmenitites.filter(item => item.amenities.id != foodId);
  }

  changeQuantityOfAmenities(foodId:number, quantity:number){
    let cartItem = this.cartAmenities.itemsAmenitites.find(item => item.amenities.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart():Cart{
    return this.cart;
  }

  getCartAmenities():CartAmenities{
    return this.cartAmenities;
  }
}
