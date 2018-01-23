import {
  Component, OnInit,
  Input, Output, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CityService } from '../../../services/city.service';
import { CityModel } from '../../../model/city.model';
import { ProvinceModel } from '../../../model/province.model';

import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { ProvinceComboComponent } from '../../shared/province-combo/province-combo.component';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
  providers: [CityService]
})
export class CityDetailComponent extends WeBaseComponent {
  service: CityService;
  @Input() cityId?: number;
  @ViewChild('provinceCombo') provinceCombo: ProvinceComboComponent;
  countryId: number;
  model = <CityModel>{};

  public opened = false;
  constructor(service: CityService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }

  public openDialog() {
    this.model = <CityModel>{};
    this.opened = true;
  }
  public openDialogById(id: number) {
    this.model.cityId = id;
    const that = this;
    that.service.loading.show();
    this.service.find(id)
      .subscribe(res => {
        that.service.operationHandling(res, function (r) {
          that.model = r;

          if (that.provinceCombo) {
            that.provinceCombo.setModel(
              <ProvinceModel>{
                provinceId: r.province,
                provinceName: r.provinceName,
                countryId: r.countryId,
                countryName: r.countryName
              });
          }

          that.service.loading.hide();
          that.opened = true;
        });
      });
  }


  public onClose() {
    this.opened = false;
    // alert('No data deleted.');
  }

  public onOk() {
    if (this.model.cityId > 0) {
      this.service.edit(this.model).subscribe(
        d => this.opened = false,
        err => console.log('error: ', err)
      );
    } else {
      this.service.add(this.model).subscribe(
        d => this.opened = false,
        err => console.log('error: ', err)
      );
    }
    // alert('Data deleted.');
  }

  public onSubmit(form) {
    // if ( this.dataItem.cityId > 0 ) {

    //   this._service.edit(this.dataItem )
    //   .subscribe((res) => {
    //     this.opened = false;
    //   });

    // }  else {

    //   this._service.add(this.dataItem )
    //   .subscribe((res) => {
    //     this.opened = false;
    //   });

    // }


  }


  public onProvinceChange(value: any) {
    this.model.provinceId = <number>value;
  }



}
