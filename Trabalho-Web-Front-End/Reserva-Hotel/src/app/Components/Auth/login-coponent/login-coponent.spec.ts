import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoponent } from './login-coponent';

describe('LoginCoponent', () => {
  let component: LoginCoponent;
  let fixture: ComponentFixture<LoginCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
