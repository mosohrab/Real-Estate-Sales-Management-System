import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBundlingComponent } from './person-bundling.component';

describe('PersonBundlingComponent', () => {
  let component: PersonBundlingComponent;
  let fixture: ComponentFixture<PersonBundlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonBundlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
