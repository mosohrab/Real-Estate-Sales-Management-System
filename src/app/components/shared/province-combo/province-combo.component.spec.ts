import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceComboComponent } from './province-combo.component';

describe('ProvinceComboComponent', () => {
  let component: ProvinceComboComponent;
  let fixture: ComponentFixture<ProvinceComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
