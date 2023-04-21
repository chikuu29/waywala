import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemViewComponent } from './search-item-view.component';

describe('SearchItemViewComponent', () => {
  let component: SearchItemViewComponent;
  let fixture: ComponentFixture<SearchItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchItemViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
