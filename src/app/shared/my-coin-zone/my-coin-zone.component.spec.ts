import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoinZoneComponent } from './my-coin-zone.component';

describe('MyCoinZoneComponent', () => {
  let component: MyCoinZoneComponent;
  let fixture: ComponentFixture<MyCoinZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCoinZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCoinZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
