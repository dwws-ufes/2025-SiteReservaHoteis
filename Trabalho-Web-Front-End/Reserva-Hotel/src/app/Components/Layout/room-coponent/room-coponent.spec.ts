import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCoponent } from './room-coponent';

describe('RoomCoponent', () => {
  let component: RoomCoponent;
  let fixture: ComponentFixture<RoomCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
