import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureProductPageComponent } from './agriculture-product-page.component';

describe('AgricultureProductPageComponent', () => {
  let component: AgricultureProductPageComponent;
  let fixture: ComponentFixture<AgricultureProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricultureProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultureProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
