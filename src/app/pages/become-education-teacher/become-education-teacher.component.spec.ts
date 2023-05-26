import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeEducationTeacherComponent } from './become-education-teacher.component';

describe('BecomeEducationTeacherComponent', () => {
  let component: BecomeEducationTeacherComponent;
  let fixture: ComponentFixture<BecomeEducationTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeEducationTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeEducationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
