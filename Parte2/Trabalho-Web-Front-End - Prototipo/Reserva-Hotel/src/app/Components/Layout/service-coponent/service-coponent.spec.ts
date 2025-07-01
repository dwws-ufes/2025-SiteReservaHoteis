import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCoponent } from './service-coponent';

describe('ServiceCoponent', () => {
  let component: ServiceCoponent;
  let fixture: ComponentFixture<ServiceCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
