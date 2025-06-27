import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageAmenitiesComponent } from './cart-page-amenities-component';

describe('CartPageAmenitiesComponent', () => {
  let component: CartPageAmenitiesComponent;
  let fixture: ComponentFixture<CartPageAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPageAmenitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
