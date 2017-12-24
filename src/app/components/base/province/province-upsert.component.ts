import {
  Component, OnInit,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { ProvinceService } from '../../../services/province.service';
import { ProvinceModel } from '../../../model/province.model';

import { BaseComponent } from '../../shared/base.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-province-upsert',
  templateUrl: './province-upsert.component.html',
  styleUrls: ['./province-upsert.component.scss'],
  providers: [
    ProvinceService
  ],

  encapsulation: ViewEncapsulation.None
})
export class ProvinceUpsertComponent extends BaseComponent {

  service: ProvinceService;
  model = <ProvinceModel>{};
  public isOpenedDialog = false;

  constructor(service: ProvinceService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <ProvinceModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {
    const that = this;
    if (this.model.provinceId > 0) {

      this.service.edit(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isOpenedDialog = false;
            } else {
              that.service.notify.showError();
            }
          });
        });

    } else {

      this.service.add(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isOpenedDialog = false;
            } else {
              that.service.notify.showError();
            }


          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;

  }


}
