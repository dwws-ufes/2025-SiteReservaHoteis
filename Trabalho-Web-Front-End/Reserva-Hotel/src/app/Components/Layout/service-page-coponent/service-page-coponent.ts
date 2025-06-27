import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food';
import { TagsComponent } from '../../Other/tags/tags.component';

@Component({
  selector: 'app-service-page-coponent',
  imports: [CommonModule, RouterLink, TagsComponent],
  templateUrl: './service-page-coponent.html',
  styleUrl: './service-page-coponent.css'
})
export class ServicePageCoponent implements OnInit {

  food!: Food;
  constructor(private activatedRoute:ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router) { 
    activatedRoute.params.subscribe((params) => {
      if(params['serviceid'])
      this.food = foodService.getFoodById(params['serviceid']);
    })

  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cartPageFood');
  }

}