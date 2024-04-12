import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedProductListComponent } from './suggested-product-list.component';

describe('SuggestedProductListComponent', () => {
  let component: SuggestedProductListComponent;
  let fixture: ComponentFixture<SuggestedProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
