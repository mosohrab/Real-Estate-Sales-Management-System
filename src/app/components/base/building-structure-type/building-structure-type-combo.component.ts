import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {BuildingstructuretypeModel } from '../../../model/base.model';
import { BuildingstructuretypeService, BuildingstructuretypeComboService } from '../../../services/building-structure-type.service';
// import {  BaseComboComponent } from 'ng2-aryanet-core';
import {  BaseComboComponent } from '../../../core/components/base.component';

@Component({
  selector: 'app-building-structure-type-combo',
  templateUrl: './building-structure-type-combo.component.html',
  styleUrls: ['./building-structure-type-combo.component.scss'],
  providers: [
    BuildingstructuretypeComboService,
    BuildingstructuretypeService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuildingStructureTypeComboComponent),
      multi: true,
    }
  ]
})
export class BuildingStructureTypeComboComponent extends BaseComboComponent {

  service: BuildingstructuretypeComboService;
  private view: Observable<BuildingstructuretypeModel[]>;

  constructor(service: BuildingstructuretypeComboService) {
    super();

    this.service = service;
    this.view = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }



}
