import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPlanStatusComponent } from './sales-plan-status.component';

describe('SalesPlanStatusComponent', () => {
  let component: SalesPlanStatusComponent;
  let fixture: ComponentFixture<SalesPlanStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPlanStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPlanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
