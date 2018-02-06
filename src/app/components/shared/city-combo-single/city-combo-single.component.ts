
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CityService, CityComboService } from '../../../services/city.service';
import { CityModel } from '../../../model/city.model';
import {  BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-city-combo-single',
  templateUrl: './city-combo-single.component.html',
  styleUrls: ['./city-combo-single.component.scss'],
  providers: [
    CityService,
    CityComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityComboSingleComponent),
      multi: true
    }
  ]
})
export class CityComboSingleComponent extends BaseComboComponent
// <CityModel, CityService> 
{

  service: CityComboService;
  private view: Observable<CityModel[]>;

  constructor(service: CityComboService) {
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
  //       that._service._baseService.operationHandling(res,
  //         (r: CityModel) => {
  //           that.selectedItem = res;
  //         });
  //     });
  // }

  public setProvinceId(id: number): void {
    this.clear();
    this.service.read(id);
  }




}
