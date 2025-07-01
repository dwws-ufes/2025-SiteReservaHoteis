import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutCoponent } from './logout-coponent';

describe('LogoutCoponent', () => {
  let component: LogoutCoponent;
  let fixture: ComponentFixture<LogoutCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
