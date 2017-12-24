import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageItemComponent } from './usage-item.component';

describe('UsageItemComponent', () => {
  let component: UsageItemComponent;
  let fixture: ComponentFixture<UsageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
