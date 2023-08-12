import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeFeedbackComponent } from './take-feedback.component';

describe('TakeFeedbackComponent', () => {
  let component: TakeFeedbackComponent;
  let fixture: ComponentFixture<TakeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
