import {
  Component, OnInit,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';


import {
  UnitFeatureValueService,
  UnitFeatureValueKendoGridService
} from '../../../services/unit-feature.service';
import { UnitFeatureTitleModel, UnitFeatureValueModel } from '../../../model/unit-feature.model';

import { WeBaseComponent } from '../../we-base.component';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-feature-value-upsert',
  templateUrl: './feature-value-upsert.component.html',
  styleUrls: ['./feature-value-upsert.component.scss'],
  providers: [
    UnitFeatureValueService,
    UnitFeatureValueKendoGridService
  ],

  encapsulation: ViewEncapsulation.None
})
export class FeatureValueUpsertComponent extends WeBaseComponent {
// extends BaseControlValueAccessor {
  _service: UnitFeatureValueService;

  // @Output()
  dataItem = <UnitFeatureValueModel>{};
  public isOpenedDialog = false;

  constructor(service: UnitFeatureValueService) {
    super();
    this._service = service;

  }

  ngOnInitHandler() {
  }


  public openDialog(id: number) {
    this.dataItem.featureTitleId = id;
    this.dataItem.featureTitleName = '';
    this.dataItem.featureValue = '';
    this.dataItem.unitFeatureValueId = null;
    this.isOpenedDialog = true;
  //  this.propagateChange(this.dataItem);
  }

  public setDataItem(item: UnitFeatureValueModel) {

 //   this.propagateChange(this.dataItem);
    this.dataItem = item;
  }
  public setDataValue(value: any) {
    const that = this;
    this._service.find(value)
      .subscribe(x => {

        that._service.operationHandling(x, (r) => {
          that.dataItem = <UnitFeatureValueModel>r;
        //  that.propagateChange(this.dataItem);
          that.isOpenedDialog = true;
        });

      });


  }


  public onOk(form) {

    const that = this;
    if (this.dataItem.unitFeatureValueId > 0) {

      this._service.edit(this.dataItem)
        .subscribe(res => {
          that._service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that._service.notify.showSuccess();
              that.isOpenedDialog = false;
            } else {
              that._service.notify.showError();
            }

          });
        });

    } else {

      this._service.add(this.dataItem)
        .subscribe(res => {
          that._service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that._service.notify.showSuccess();
              that.isOpenedDialog = false;
            } else {
              that._service.notify.showError();
            }


          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;

  }

  // writeValue(obj: any): void {
  //   if (obj) {
  //     this.dataItem = obj;
  //   }
  // }



}
