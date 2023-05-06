import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOnWaywalaComponent } from './sell-on-waywala.component';

describe('SellOnWaywalaComponent', () => {
  let component: SellOnWaywalaComponent;
  let fixture: ComponentFixture<SellOnWaywalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellOnWaywalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellOnWaywalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
