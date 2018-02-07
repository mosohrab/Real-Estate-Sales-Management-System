import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ProvinceService, ProvinceComboService } from '../../../services/province.service';
import { ProvinceModel } from '../../../model/Province.model';
import {  BaseComboComponent } from '../../../core/components/base.component';

@Component({
  selector: 'app-province-combo-single',
  templateUrl: './province-combo-single.component.html',
  styleUrls: ['./province-combo-single.component.scss'],
  providers: [
    ProvinceComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceComboSingleComponent),
      multi: true
    }
  ]
})
export class ProvinceComboSingleComponent extends BaseComboComponent
// <ProvinceModel, ProvinceService> 
{

  service: ProvinceComboService;
  private view: Observable<ProvinceModel[]>;

  constructor(service: ProvinceComboService) {
    super();
    this.view = service;
    this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }

  // public setDataValue(id: number): void {
  //   this.clear();
  //   const that = this;
  //   this._service._baseService.find(id)
  //     .subscribe((res) => {
  //       that._service._baseService.operationHandling(res, (r: ProvinceModel) => {
  //         that.selectedItem = res;
  //       });
  //     });
  // }



  public setCountryId(id: number): void {
    this.clear();
    this.service.read(id);
  }

}
