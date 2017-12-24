import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryComboComponent } from './country-combo.component';

describe('CountryComboComponent', () => {
  let component: CountryComboComponent;
  let fixture: ComponentFixture<CountryComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
