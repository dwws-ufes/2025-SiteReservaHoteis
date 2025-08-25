import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Food } from '../models/food';
import { MatDialog } from '@angular/material/dialog';
import { FoodPageComponent } from '../modals/food-page/food-page.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { takeUntil, switchMap, of, Subject, tap } from 'rxjs';
import { Restaurant } from '../models/restaurant';

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

  restaurant!: Restaurant

  private destroy$ = new Subject<void>();

  isLogged: boolean = false;
  
  constructor(
    private readonly foodService: FoodService, 
    private readonly dialog: MatDialog, 
    private readonly auth: AuthService, 
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private readonly router: Router,) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap
          .pipe(
            takeUntil(this.destroy$),
            switchMap(pm => {
              const encoded = pm.get('restaurantname');
              if (!encoded) {
                this.router.navigate(['/']);
                return of(null);
              }
              const name = decodeURIComponent(encoded);
    
              // busca exata primeiro; se não achar, tenta parcial (contém)
              return this.restaurantService.getByName(name).pipe(
                switchMap(h => (h ? of(h) : this.restaurantService.getByName(name, { partial: true })))
              );
            })
          )
          .subscribe({
            next: (h) => {
              if (!h) {
                // não achou nem exato nem parcial
                this.router.navigate(['/']);
                return;
              }
              this.restaurant = h;
            },
            error: () => this.router.navigate(['/'])
          });
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