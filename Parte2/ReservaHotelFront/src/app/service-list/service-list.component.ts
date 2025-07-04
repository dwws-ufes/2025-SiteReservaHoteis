import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Food } from '../models/food';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { FoodPageComponent } from '../modals/food-page/food-page.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  serviceType = '';
  foods: Food[] = [];
  searchTerm: String = "";
  constructor(private foodService: FoodService, private route: ActivatedRoute, private readonly dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getFood();
  }

  foodPage(food: Food) {
      const dialog = this.dialog.open(FoodPageComponent, {
        data: { food, btnSuccess: 'Edit room', btnDelete: 'Delete room' },
        width: '1500px',
        height: '800px'
      });
  
      dialog.afterClosed()
        .subscribe(success => {
          if (!success)
            return;
  
          this.getFood();
        })
    }

    getFood() {
        this.route.params.subscribe(params => {
          if (params['searchTerm']){
            this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
          }
          else if (params['tag'])
            this.foods = this.foodService.getAllFoodsByTag(params['tag']);
          else
            this.foods = this.foodService.getAll();
        })
      }

}