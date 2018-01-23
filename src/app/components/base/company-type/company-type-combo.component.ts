import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CompanyTypeModel } from '../../../model/company.model';
import { CompanyTypeService, CompanyTypeComboService } from '../../../services/company-type.service';
import {  BaseComboComponent } from '../../../core/components/base.component';

@Component({
  selector: 'app-company-type-combo',
  templateUrl: './company-type-combo.component.html',
  styleUrls: ['./company-type-combo.component.scss'],
  providers: [
    CompanyTypeService,
    CompanyTypeComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompanyTypeComboComponent),
      multi: true,
    }
  ]
})
export class CompanyTypeComboComponent extends BaseComboComponent {
  // extends BaseComponent {

  service: CompanyTypeComboService;
  private view: Observable<CompanyTypeModel[]>;

  constructor(service: CompanyTypeComboService) {
    super();

    this.service = service;
    this.view = service;
    // this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }




}
