import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CartItem, CartItemAmenities } from '../../../shared/models/CartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page-coponent',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page-coponent.html',
  styleUrl: './cart-page-coponent.css'
})
export class CartPageCoponent implements OnInit {
  cart!:Cart;
  constructor(private cartService: CartService) { 
    this.setCart();
  }
  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity= parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }

}