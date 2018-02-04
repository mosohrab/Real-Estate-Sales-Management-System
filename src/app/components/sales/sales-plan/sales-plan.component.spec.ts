import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPlanComponent } from './sales-plan.component';

describe('SalesPlanComponent', () => {
  let component: SalesPlanComponent;
  let fixture: ComponentFixture<SalesPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
