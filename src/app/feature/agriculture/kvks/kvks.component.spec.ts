import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvksComponent } from './kvks.component';

describe('KvksComponent', () => {
  let component: KvksComponent;
  let fixture: ComponentFixture<KvksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
