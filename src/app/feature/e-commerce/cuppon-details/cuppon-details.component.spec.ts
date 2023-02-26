import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupponDetailsComponent } from './cuppon-details.component';

describe('CupponDetailsComponent', () => {
  let component: CupponDetailsComponent;
  let fixture: ComponentFixture<CupponDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupponDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CupponDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
