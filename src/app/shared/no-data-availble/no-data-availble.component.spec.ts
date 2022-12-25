import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataAvailbleComponent } from './no-data-availble.component';

describe('NoDataAvailbleComponent', () => {
  let component: NoDataAvailbleComponent;
  let fixture: ComponentFixture<NoDataAvailbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDataAvailbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataAvailbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
