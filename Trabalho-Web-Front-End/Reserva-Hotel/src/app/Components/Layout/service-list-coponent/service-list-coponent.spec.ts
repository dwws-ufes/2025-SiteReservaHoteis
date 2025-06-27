import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListCoponent } from './service-list-coponent';

describe('ServiceListCoponent', () => {
  let component: ServiceListCoponent;
  let fixture: ComponentFixture<ServiceListCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
