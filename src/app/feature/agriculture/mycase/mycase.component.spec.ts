import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycaseComponent } from './mycase.component';

describe('MycaseComponent', () => {
  let component: MycaseComponent;
  let fixture: ComponentFixture<MycaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
