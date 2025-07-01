import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../Other/search-coponent/search-coponent';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food/food.service';
import { TagsComponent } from '../../Other/tags/tags.component';
import { Amenities } from '../../../shared/models/Amenities';
import { AmenitiesService } from '../../../services/amenities/amenities-service';


@Component({
  selector: 'app-service-list-coponent',
  imports: [Search, CommonModule, RouterLink, TagsComponent],
  templateUrl: './service-list-coponent.html',
  styleUrl: './service-list-coponent.css'
})
export class ServiceListCoponent implements OnInit {

  serviceType = '';
  amenities: Amenities[] = [];
  foods: Food[] = [];
  searchTerm: String = "";
  constructor(private foodService: FoodService, private amenitiesService: AmenitiesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.serviceType = params.get('type') || '';
    });

    this.route.params.subscribe(params => {
      if (params['searchTerm']){
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
        this.amenities = this.amenitiesService.getAllAmenitiesBySearchTerm(params['searchTerm']);
      }
      else if (params['tag'])
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      else
        this.foods = this.foodService.getAll();
        this.amenities = this.amenitiesService.getAll();
    })
  }

}