import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageCoponent } from './cart-page-coponent';

describe('CartPageCoponent', () => {
  let component: CartPageCoponent;
  let fixture: ComponentFixture<CartPageCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPageCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
