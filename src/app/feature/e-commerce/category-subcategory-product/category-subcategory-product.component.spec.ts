import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubcategoryProductComponent } from './category-subcategory-product.component';

describe('CategorySubcategoryProductComponent', () => {
  let component: CategorySubcategoryProductComponent;
  let fixture: ComponentFixture<CategorySubcategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySubcategoryProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySubcategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
