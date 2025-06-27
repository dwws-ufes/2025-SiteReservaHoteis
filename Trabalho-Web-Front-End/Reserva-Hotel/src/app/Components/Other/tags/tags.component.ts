import { Component, Input, OnInit } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../services/food/food.service';
import { Tag } from '../../../shared/models/Tag';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterLink],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input()
  foodPageTags?:string[];

  @Input()
  justifyContent:string = 'center';

  tags?:Tag[];
  constructor(private foodService:FoodService) { }

  ngOnInit(): void {
    if(!this.foodPageTags)
     this.tags = this.foodService.getAllTags();
  }

}
