import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingStructureTypeComponent } from './building-structure-type.component';

describe('BuildingStructureTypeComponent', () => {
  let component: BuildingStructureTypeComponent;
  let fixture: ComponentFixture<BuildingStructureTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingStructureTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingStructureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
