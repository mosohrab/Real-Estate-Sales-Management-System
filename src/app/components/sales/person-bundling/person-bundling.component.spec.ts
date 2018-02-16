import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBundlingIndexComponent } from './person-bundling-index.component';

describe('PersonBundlingIndexComponent', () => {
  let component: PersonBundlingIndexComponent;
  let fixture: ComponentFixture<PersonBundlingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonBundlingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBundlingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
