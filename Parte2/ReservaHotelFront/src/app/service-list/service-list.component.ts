import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Food } from '../models/food';
import { MatDialog } from '@angular/material/dialog';
import { FoodPageComponent } from '../modals/food-page/food-page.component';

interface FoodFeature {
  img: string;
  title: string;
  description: string;
}

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
  
  constructor(private readonly foodService: FoodService, private readonly route: ActivatedRoute, private readonly dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getFood();
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

  foodFeatures: FoodFeature[] = [
    {
      img: '/assets/imgs/food-take-out/room-service.jpg',
      title: 'Room Service',
      description: 'Refeições completas entregues diretamente no conforto do seu quarto.'
    },
    {
      img: '/assets/imgs/food-take-out/take-out.jpg',
      title: 'Take-Out',
      description: 'Opções práticas e rápidas para viagem, prontas em poucos minutos.'
    },
    {
      img: '/assets/imgs/food-take-out/special-menu.jpg',
      title: 'Menu Especial',
      description: 'Pratos exclusivos preparados pelos nossos chefs para ocasiões especiais.'
    },
    {
      img: '/assets/imgs/food-take-out/healthy-options.jpg',
      title: 'Opções Saudáveis',
      description: 'Refeições balanceadas e nutritivas para quem busca bem-estar.'
    }
  ];
}