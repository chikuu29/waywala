import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAgricultueInvestigratorComponent } from './become-agricultue-investigrator.component';

describe('BecomeAgricultueInvestigratorComponent', () => {
  let component: BecomeAgricultueInvestigratorComponent;
  let fixture: ComponentFixture<BecomeAgricultueInvestigratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAgricultueInvestigratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAgricultueInvestigratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
