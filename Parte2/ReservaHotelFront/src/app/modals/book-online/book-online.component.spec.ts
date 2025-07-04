import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOnlineComponent } from './book-online.component';

describe('BookOnlineComponent', () => {
  let component: BookOnlineComponent;
  let fixture: ComponentFixture<BookOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookOnlineComponent]
    });
    fixture = TestBed.createComponent(BookOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
