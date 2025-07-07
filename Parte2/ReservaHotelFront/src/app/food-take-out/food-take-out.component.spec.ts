import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTakeOutComponent } from './food-take-out.component';

describe('FoodTakeOutComponent', () => {
  let component: FoodTakeOutComponent;
  let fixture: ComponentFixture<FoodTakeOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodTakeOutComponent]
    });
    fixture = TestBed.createComponent(FoodTakeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
