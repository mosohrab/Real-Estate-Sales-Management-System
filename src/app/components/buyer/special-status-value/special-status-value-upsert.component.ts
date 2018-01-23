import {
  Component, OnInit, Input, Output,
  forwardRef, EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { State } from '@progress/kendo-data-query';
import {
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { SpecialStatusValueService } from '../../../services/special-status-value.service';
import { SpecialStatusModel, SpecialStatusValueModel } from '../../../model/special-status.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';

@Component({
  selector: 'app-special-status-value-upsert',
  templateUrl: './special-status-value-upsert.component.html',
  styleUrls: ['./special-status-value-upsert.component.scss'],
  providers: [SpecialStatusValueService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpecialStatusValueUpsertComponent),
      multi: true,
    }
  ]
})
export class SpecialStatusValueUpsertComponent extends WeBaseComponent {
  service: SpecialStatusValueService;

  @Input() dataItem = <SpecialStatusValueModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  constructor(service: SpecialStatusValueService) {
    super();
    this.service = service;

  }

  ngOnInitHandler() {
  }




  public openDialog(statusId: number, statusName: string) {
    this.dataItem = <SpecialStatusValueModel>{};
    this.dataItem.specialStatusId = statusId;
    this.dataItem.specialStatusName = statusName;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.dataItem = <SpecialStatusValueModel>r;
          that.isOpenedDialog = true;
        });

      });
  }





  public onOk(form) {
    const that = this;
    if (this.dataItem.specialStatusValueId > 0) {

      this.service.edit(this.dataItem)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isSuccessAction = true;
              that.onClose();
            } else {
              that.service.notify.showError();
            }

          });
        });

    } else {

      this.service.add(this.dataItem)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isSuccessAction = true;
              that.onClose();
            } else {
              that.service.notify.showError();
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
