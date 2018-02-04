import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveBundlingComponent } from './selective-bundling.component';

describe('SelectiveBundlingComponent', () => {
  let component: SelectiveBundlingComponent;
  let fixture: ComponentFixture<SelectiveBundlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveBundlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
