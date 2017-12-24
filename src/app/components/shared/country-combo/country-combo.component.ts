import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CountryModel } from '../../../model/country.model';
import { CountryService, CountryComboService } from '../../../services/country.service';
import { BaseComponent, BaseComboComponent } from '../base.component';

@Component({
  selector: 'app-country-combo',
  templateUrl: './country-combo.component.html',
  styleUrls: ['./country-combo.component.scss'],
  providers: [
    CountryComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryComboComponent),
      multi: true,
    }
  ]
})
export class CountryComboComponent extends BaseComboComponent
// <CountryModel, CountryService>
{

  service: CountryComboService;
  private view: Observable<CountryModel[]>;

  constructor(service: CountryComboService) {
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
