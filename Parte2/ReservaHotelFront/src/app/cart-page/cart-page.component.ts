import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart, CartItem } from '../models/cart';
import { ServiceCreate, ServiceItem } from '../models/service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ServiceService } from '../services/service.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!:Cart;
  user!:User;

  success = false;

  constructor(
    private readonly cartService: CartService, 
    private readonly userService: UserService,
    private readonly serviceService: ServiceService,
    private readonly toastr: ToastrService
  ) { 
    this.setCart();
    this.userService.getUserProfile().subscribe(user => this.user = user)
  }
  ngOnInit(): void {}

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity= parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  checkOut() {
    // Mapeia cada CartItem para ServiceItem
    const itens: ServiceItem[] = this.cart.items.map(ci => ({
      food: ci.food.name,
      quantity: ci.quantity
    }));

    // Gera o objeto ServiceCreate
    const serviceCreate: ServiceCreate = {
      userId : this.user.id,
      totalprice: this.cart.totalPrice,
      itens,
      deliveryTime: new Date().toISOString(),
      status: 'pending'
    };

    this.serviceService.createService(serviceCreate)
        .pipe(
          tap(() => {
            this.toastr.success('Quarto criado com sucesso!', 'Sucesso!');
            this.success = true;
          })
        )
        .subscribe();

  }

}
