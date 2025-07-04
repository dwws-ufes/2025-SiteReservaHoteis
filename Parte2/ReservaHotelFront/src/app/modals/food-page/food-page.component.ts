import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {

  food!: Food;
  success = false;

  constructor(
    public dialogRef: MatDialogRef<FoodPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { food: Food, btnSuccess: string, btnDelete: string },
    private readonly foodService: FoodService,
    private readonly cartService: CartService,
    private readonly toastr: ToastrService,
    private activatedRoute:ActivatedRoute,
    private router: Router) { 
    this.food = {
      id: data.food.id,
      name: data.food.name,
      price: data.food.price,
      favorite: data.food.favorite,
      imageUrl: data.food.imageUrl,
      stars: data.food.stars,
      origins: data.food.origins,
      cookTime: data.food.cookTime
    }

  }

  close() {
    this.dialogRef.close(this.success);
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cartpagefood');
    this.close();
  }


}
