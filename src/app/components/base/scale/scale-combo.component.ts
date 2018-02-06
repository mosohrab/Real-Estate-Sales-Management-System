import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ScaleModel } from '../../../model/base.model';
import { ScaleService, ScaleComboService } from '../../../services/scale.service';
import {  BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-scale-combo',
  templateUrl: './scale-combo.component.html',
  styleUrls: ['./scale-combo.component.scss'],
  providers: [
    ScaleService,
    ScaleComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScaleComboComponent),
      multi: true,
    }
  ]
})
export class ScaleComboComponent extends BaseComboComponent {

  service: ScaleComboService;
  private view: Observable<ScaleModel[]>;

  constructor(service: ScaleComboService) {
    super();

    this.service = service;
    this.view = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.read();
    }
  }



}
