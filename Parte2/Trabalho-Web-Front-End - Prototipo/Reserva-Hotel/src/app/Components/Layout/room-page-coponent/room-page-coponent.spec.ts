import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPageCoponent } from './room-page-coponent';

describe('RoomPageCoponent', () => {
  let component: RoomPageCoponent;
  let fixture: ComponentFixture<RoomPageCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPageCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPageCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
