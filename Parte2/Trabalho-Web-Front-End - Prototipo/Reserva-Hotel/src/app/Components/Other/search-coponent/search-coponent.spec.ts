import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoponent } from './search-coponent';

describe('SearchCoponent', () => {
  let component: SearchCoponent;
  let fixture: ComponentFixture<SearchCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
