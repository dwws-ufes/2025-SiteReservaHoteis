import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePageCoponent } from './service-page-coponent';

describe('ServicePageCoponent', () => {
  let component: ServicePageCoponent;
  let fixture: ComponentFixture<ServicePageCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePageCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePageCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
