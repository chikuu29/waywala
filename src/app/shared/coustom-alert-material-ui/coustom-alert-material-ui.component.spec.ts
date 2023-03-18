import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomAlertMaterialUiComponent } from './coustom-alert-material-ui.component';

describe('CoustomAlertMaterialUiComponent', () => {
  let component: CoustomAlertMaterialUiComponent;
  let fixture: ComponentFixture<CoustomAlertMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomAlertMaterialUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoustomAlertMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
