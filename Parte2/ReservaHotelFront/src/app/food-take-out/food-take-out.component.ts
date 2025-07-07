import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Food } from '../models/food';
import { MatDialog } from '@angular/material/dialog';
import { FoodPageComponent } from '../modals/food-page/food-page.component';
import { AuthService } from '../services/auth.service';

interface FoodFeature {
  img: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-food-take-out',
  templateUrl: './food-take-out.component.html',
  styleUrls: ['./food-take-out.component.css']
})
export class FoodTakeOutComponent {
  foodFeatures: FoodFeature[] = [
    {
      img: '/assets/imgs/food-take-out/room-service.jpg',
      title: 'Room Service',
      description: 'Full meals delivered directly to the comfort of your room.'
    },
    {
      img: '/assets/imgs/food-take-out/take-out.jpg',
      title: 'Take-Out',
      description: 'Quick and convenient options to go, ready in minutes.'
    },
    {
      img: '/assets/imgs/food-take-out/special-menu.jpg',
      title: 'Special Menu',
      description: 'Exclusive dishes crafted by our chefs for special occasions.'
    },
    {
      img: '/assets/imgs/food-take-out/healthy-options.jpg',
      title: 'Healthy Options',
      description: 'Balanced and nutritious meals for those seeking wellness.'
    }
  ]
}
