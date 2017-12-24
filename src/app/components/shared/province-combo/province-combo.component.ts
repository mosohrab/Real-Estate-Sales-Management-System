import {
  Component, OnInit, Input,
  Output, EventEmitter,
  forwardRef
} from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ProvinceService, ProvinceComboService } from '../../../services/province.service';
import { ProvinceModel } from '../../../model/Province.model';
import { BaseComponent, BaseComboComponent } from '../base.component';

@Component({
  selector: 'app-province-combo',
  templateUrl: './province-combo.component.html',
  styleUrls: ['./province-combo.component.scss'],
  providers: [
    ProvinceComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: (c) => { },
      useExisting: forwardRef(() => ProvinceComboComponent),
      multi: true
    }
  ]
})
export class ProvinceComboComponent extends BaseComboComponent {
  public model = <ProvinceModel>{};
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
  //       that._service._baseService.operationHandling(res,
  //         (r: CityModel) => {
  //           that.selectedItem = res;
  //         });
  //     });
  // }

  public setModel(model: ProvinceModel): void {
    this.model = model;
  }
  public onCountryChange(value: any) {
    this.service.read(value);
  }



}
