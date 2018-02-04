import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentBundlingComponent } from './parent-bundling.component';

describe('ParentBundlingComponent', () => {
  let component: ParentBundlingComponent;
  let fixture: ComponentFixture<ParentBundlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentBundlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
