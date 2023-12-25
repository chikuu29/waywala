import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMarketInformationComponent } from './search-market-information.component';

describe('SearchMarketInformationComponent', () => {
  let component: SearchMarketInformationComponent;
  let fixture: ComponentFixture<SearchMarketInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMarketInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMarketInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
