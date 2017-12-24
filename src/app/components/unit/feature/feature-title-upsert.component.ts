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
  UnitFeatureTitleService,
  UnitFeatureComboService
} from '../../../services/unit-feature.service';
import { UnitFeatureTitleModel } from '../../../model/unit-feature.model';

import { BaseComponent } from '../../shared/base.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-feature-title-upsert',
  templateUrl: './feature-title-upsert.component.html',
  styleUrls: ['./feature-title-upsert.component.scss'],
  providers: [
    UnitFeatureTitleService,
    UnitFeatureComboService
  ],

  encapsulation: ViewEncapsulation.None
})
export class FeatureTitleUpsertComponent extends BaseComponent {
// extends BaseControlValueAccessor {
  _service: UnitFeatureTitleService;

  // @Output()
  dataItem = <UnitFeatureTitleModel>{};
  public isOpenedDialog = false;

  constructor(service: UnitFeatureTitleService) {
    super();
    this._service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.dataItem.featureId = null;
    this.dataItem.featureTitleName = '';
    this.dataItem.featureName = '';
    this.dataItem.unitFeatureTitleId = null;
    this.dataItem.canMoreSelect = null;
    this.isOpenedDialog = true;
  }

  public setDataItem(item: UnitFeatureTitleModel) {
    this.dataItem = item;
  }

  public setDataValue(value: any) {
    const that = this;
    this._service.find(value)
      .subscribe(x => {

        that._service.operationHandling(x, (r) => {
          that.dataItem = <UnitFeatureTitleModel>r;
          that.isOpenedDialog = true;
        });

      });


  }


  public onOk(form) {
    const that = this;
    if (this.dataItem.unitFeatureTitleId > 0) {

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


}
