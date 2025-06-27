import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageCoponent } from './user-page-coponent';

describe('UserPageCoponent', () => {
  let component: UserPageCoponent;
  let fixture: ComponentFixture<UserPageCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPageCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
