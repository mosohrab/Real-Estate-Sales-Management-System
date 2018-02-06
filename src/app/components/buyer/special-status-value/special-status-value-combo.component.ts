import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SpecialStatusValueModel } from '../../../model/special-status.model';
import { SpecialStatusValueComboService } from '../../../services/special-status-value.service';
import {  BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-special-status-value-combo',
  templateUrl: './special-status-value-combo.component.html',
  styleUrls: ['./special-status-value-combo.component.scss'],
  providers: [
    SpecialStatusValueComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpecialStatusValueComboComponent),
      multi: true,
    }
  ]
  // inputs: ['defaultValue']
})
export class SpecialStatusValueComboComponent extends BaseComboComponent {
  // extends BaseComponent {

  service: SpecialStatusValueComboService;

  // @Input() selectedId: number;
  public statusId?: number;
  // @Output() valueChanged = new EventEmitter<number>();

  //   service: CountryComboService;
  // public listItems: Observable<CountryModel[]> ;

  private view: Observable<SpecialStatusValueModel[]>;
  constructor(service: SpecialStatusValueComboService) {
    super();

    this.service = service;
    this.view = service;


    // this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.read();
    }

  }

  public read() {
    if (this.statusId != null && this.statusId > 0) {
      this.service.read(this.statusId);
    } else {
      this.service.readAll();
    }
  }


}
