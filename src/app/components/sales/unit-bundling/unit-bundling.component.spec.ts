import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBundlingComponent } from './unit-bundling.component';

describe('UnitBundlingComponent', () => {
  let component: UnitBundlingComponent;
  let fixture: ComponentFixture<UnitBundlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitBundlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
