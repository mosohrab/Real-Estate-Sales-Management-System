import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureValueComponent } from './feature-value.component';

describe('FeatureValueComponent', () => {
  let component: FeatureValueComponent;
  let fixture: ComponentFixture<FeatureValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
