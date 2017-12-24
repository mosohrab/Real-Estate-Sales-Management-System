import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringUnitComponent } from './measuring-unit.component';

describe('MeasuringUnitComponent', () => {
  let component: MeasuringUnitComponent;
  let fixture: ComponentFixture<MeasuringUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuringUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
