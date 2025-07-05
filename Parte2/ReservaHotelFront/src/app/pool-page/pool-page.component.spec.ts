import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolPageComponent } from './pool-page.component';

describe('PoolPageComponent', () => {
  let component: PoolPageComponent;
  let fixture: ComponentFixture<PoolPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoolPageComponent]
    });
    fixture = TestBed.createComponent(PoolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
