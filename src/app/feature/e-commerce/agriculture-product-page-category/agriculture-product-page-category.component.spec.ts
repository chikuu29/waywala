import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureProductPageCategoryComponent } from './agriculture-product-page-category.component';

describe('AgricultureProductPageCategoryComponent', () => {
  let component: AgricultureProductPageCategoryComponent;
  let fixture: ComponentFixture<AgricultureProductPageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricultureProductPageCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultureProductPageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
