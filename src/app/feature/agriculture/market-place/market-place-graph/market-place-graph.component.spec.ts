import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceGraphComponent } from './market-place-graph.component';

describe('MarketPlaceGraphComponent', () => {
  let component: MarketPlaceGraphComponent;
  let fixture: ComponentFixture<MarketPlaceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPlaceGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPlaceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
