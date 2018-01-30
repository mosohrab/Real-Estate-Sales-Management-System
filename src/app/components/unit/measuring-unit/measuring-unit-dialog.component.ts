import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { MeasuringUnitService } from '../../../services/measuring-unit.service';
import { MeasuringUnitModel } from '../../../model/unit.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';

@Component({
  selector: 'app-measuring-unit-dialog',
  templateUrl: './measuring-unit-dialog.component.html',
  styleUrls: ['./measuring-unit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MeasuringUnitService
  ],
})
export class MeasuringUnitDialogComponent extends WeBaseComponent {
  // extends BaseControlValueAccessor {
  _service: MeasuringUnitService;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  dataItem = <MeasuringUnitModel>{};
  public isOpenedDialog = false;

  constructor(service: MeasuringUnitService) {
    super();
    this._service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.dataItem = <MeasuringUnitModel>{};
    this.isOpenedDialog = true;
  }

  public setDataItem(item: MeasuringUnitModel) {
    this.dataItem = item;
  }

  public setDataValue(value: any) {
    const that = this;
    this._service.find(value)
      .subscribe(x => {

        that._service.operationHandling(x, (r) => {
          that.dataItem = <MeasuringUnitModel>r;
          that.isOpenedDialog = true;
        });
      });

  }


  public onOk(form) {
    const that = this;
    if (this.dataItem.measuringUnitId > 0) {

      this._service.edit(this.dataItem)
        .subscribe(res => {
          that._service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that._service.notify.showSuccess();
              that.isSuccessAction = true;
              that.onClose();
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
              that.isSuccessAction = true;
              that.onClose();
            } else {
              that._service.notify.showError();
            }


          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(this.isSuccessAction);

  }



}
