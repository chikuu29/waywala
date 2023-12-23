import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceManagementComponent } from './market-place-management.component';

describe('MarketPlaceManagementComponent', () => {
  let component: MarketPlaceManagementComponent;
  let fixture: ComponentFixture<MarketPlaceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPlaceManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPlaceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
