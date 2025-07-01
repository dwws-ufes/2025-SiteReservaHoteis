import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCoponent } from './register-coponent';

describe('RegisterCoponent', () => {
  let component: RegisterCoponent;
  let fixture: ComponentFixture<RegisterCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
