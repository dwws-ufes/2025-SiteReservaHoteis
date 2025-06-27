import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundCoponent } from './not-found-coponent';

describe('NotFoundCoponent', () => {
  let component: NotFoundCoponent;
  let fixture: ComponentFixture<NotFoundCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
