import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { CartAmenities } from '../../../shared/models/Cart';
import { CartItem, CartItemAmenities } from '../../../shared/models/CartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page-amenities-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page-amenities-component.html',
  styleUrl: './cart-page-amenities-component.css'
})
export class CartPageAmenitiesComponent implements OnInit {
  cart!:CartAmenities;
  constructor(private cartService: CartService) { 
    this.setCart();
  }
  ngOnInit(): void {
  }

  removeAmenitiesFromCart(cartItem:CartItemAmenities){
    this.cartService.removeAmenitiesFromCart(cartItem.amenities.id);
    this.setCart();
  }

  changeQuantityOfAmenities(cartItem:CartItemAmenities, quantityInString:string){
    const quantity= parseInt(quantityInString);
    this.cartService.changeQuantityOfAmenities(cartItem.amenities.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCartAmenities();
  }

}