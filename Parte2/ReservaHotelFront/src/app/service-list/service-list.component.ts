import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Food } from '../models/food';
import { MatDialog } from '@angular/material/dialog';
import { FoodPageComponent } from '../modals/food-page/food-page.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  serviceType = '';
  foods: Food[] = [];

  searchId: number | undefined;
  searchTerm: string | undefined;
  searchTag: string | undefined;

  isLogged: boolean = false;
  
  constructor(private readonly foodService: FoodService, private readonly dialog: MatDialog, private readonly auth: AuthService) { }

  ngOnInit(): void {
    this.getFood();
    this.isLogged = this.auth.isLoggedIn();
  }

  foodPage(food: Food) {
    const dialog = this.dialog.open(FoodPageComponent, {
      data: { food, btnSuccess: 'Edit food', btnDelete: 'Delete food' },
      width: '1500px'
    });

    dialog.afterClosed()
      .subscribe(success => {
        if (!success)
          return;

        this.getFood();
      })
  }

  getFood() {
    this.foodService.get(this.searchId, this.searchTerm, this.searchTag)
      .subscribe(foods => this.foods = foods);
  }

  getSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.getFood();
  }
}