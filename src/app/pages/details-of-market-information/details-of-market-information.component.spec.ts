import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfMarketInformationComponent } from './details-of-market-information.component';

describe('DetailsOfMarketInformationComponent', () => {
  let component: DetailsOfMarketInformationComponent;
  let fixture: ComponentFixture<DetailsOfMarketInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfMarketInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOfMarketInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
