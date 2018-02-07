import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {  BaseComboComponent } from '../../../core/components/base.component';

@Component({
  selector: 'app-scale-type-combo',
  templateUrl: './scale-type-combo.component.html',
  styleUrls: ['./scale-type-combo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScaleTypeComboComponent),
      multi: true,
    }
  ]
})
export class ScaleTypeComboComponent extends BaseComboComponent {

  scaleTypes = ['number', 'decimal', 'boolean', 'string'];
  constructor() {
    super();

  }

  ngOnInitHandler() {

  }



}
