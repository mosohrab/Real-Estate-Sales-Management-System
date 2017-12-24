import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SpecialStatusModel } from '../../../model/special-status.model';
import { SpecialStatusComboService } from '../../../services/special-status.service';
import { BaseComponent, BaseComboComponent } from '../../shared/base.component';

@Component({
  selector: 'app-special-status-combo',
  templateUrl: './special-status-combo.component.html',
  styleUrls: ['./special-status-combo.component.scss'],
  providers: [
    SpecialStatusComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpecialStatusComboComponent),
      multi: true,
    }
  ]
  // inputs: ['defaultValue']
})
export class SpecialStatusComboComponent extends BaseComboComponent {
  // extends BaseComponent {

  service: SpecialStatusComboService;

  //   service: CountryComboService;
  // public listItems: Observable<CountryModel[]> ;

  private view: Observable<SpecialStatusModel[]>;
  constructor(service: SpecialStatusComboService) {
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
