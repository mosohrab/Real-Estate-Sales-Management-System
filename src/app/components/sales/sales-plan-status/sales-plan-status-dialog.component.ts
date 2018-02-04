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


import { SalesPlanStatusService } from '../../../services/sales.service';
import { SalesPlanStatusModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-sales-plan-status-dialog',
  templateUrl: './sales-plan-status-dialog.component.html',
  styleUrls: ['./sales-plan-status-dialog.component.scss'],
  providers: [
    SalesPlanStatusService
  ],

  encapsulation: ViewEncapsulation.None
})
export class SalesPlanStatusDialogComponent extends WeBaseComponent {
  service: SalesPlanStatusService;
  model = <SalesPlanStatusModel>{};
  public isOpenedDialog = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  constructor(service: SalesPlanStatusService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <SalesPlanStatusModel>{};
    this.model.salesPlanStatusId = 0;
    this.isOpenedDialog = true;
  }


  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <SalesPlanStatusModel>r;
          that.isOpenedDialog = true;
        });

      });
  }


  public setDataValue(value: any) {
    const that = this;
    this.service.find(value)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <SalesPlanStatusModel>r;
          that.isOpenedDialog = true;
        });

      });


  }


  public onOk(form) {
    const that = this;
    if (this.model.salesPlanStatusId > 0) {

      this.service.put(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.onClose();
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
    this.closedDialog.emit(true);
  }



}
