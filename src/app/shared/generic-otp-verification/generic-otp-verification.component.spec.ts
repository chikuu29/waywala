import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericOtpVerificationComponent } from './generic-otp-verification.component';

describe('GenericOtpVerificationComponent', () => {
  let component: GenericOtpVerificationComponent;
  let fixture: ComponentFixture<GenericOtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericOtpVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
