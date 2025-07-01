import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food';
import { TagsComponent } from '../../Other/tags/tags.component';
import { Amenities } from '../../../shared/models/Amenities';
import { AmenitiesService } from '../../../services/amenities/amenities-service';

@Component({
  selector: 'app-service-page-amenities-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './service-page-amenities-component.html',
  styleUrl: './service-page-amenities-component.css'
})
export class ServicePageAmenitiesComponent implements OnInit {

  food!: Amenities;
  constructor(private activatedRoute:ActivatedRoute,
    private foodService: AmenitiesService,
    private cartService: CartService,
    private router: Router) { 
    activatedRoute.params.subscribe((params) => {
      if(params['serviceid'])
      this.food = foodService.getAmenitiesById(params['serviceid']);
    })

  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addAmenitesToCart(this.food);
    this.router.navigateByUrl('/cartPageAmenities');
  }

}