import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageAmenitiesComponent } from './service-page-amenities-component';

describe('ServicePageAmenitiesComponent', () => {
  let component: ServicePageAmenitiesComponent;
  let fixture: ComponentFixture<ServicePageAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePageAmenitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePageAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
