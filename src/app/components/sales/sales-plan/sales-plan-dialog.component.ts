import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation, ViewChild
} from '@angular/core';
import { SalesPlanService } from '../../../services/sales.service';
import { SalesPlanModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import * as moment from 'jalali-moment';
import { SalesPlanDetailComponent } from './sales-plan-detail.component';

@Component({
  selector: 'app-sales-plan-dialog',
  templateUrl: './sales-plan-dialog.component.html',
  styleUrls: ['./sales-plan-dialog.component.scss'],
  providers: [
    SalesPlanService
  ],

  encapsulation: ViewEncapsulation.None
})
export class SalesPlanDialogComponent extends WeBaseComponent {
  service: SalesPlanService;
  model = <SalesPlanModel>{};
  public isOpenedDialog = false;

  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('planDetail') planDetail: SalesPlanDetailComponent;

  startDate: any;
  endDate: any;

  constructor(service: SalesPlanService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <SalesPlanModel>{};
    this.model.salesPlanId = 0;
    this.isOpenedDialog = true;
  }



  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <SalesPlanModel>r;
          debugger;
          if (that.planDetail !== undefined) {
            that.planDetail.setPlanModel(that.model);
          }

          if (that.model.startDate !== undefined) {
            this.startDate = moment(this.model.startDate);
          }
          if (that.model.endDate !== undefined) {
            this.endDate = moment(this.model.endDate);
          }


          that.isOpenedDialog = true;
        });

      });
  }




  public onOk(form) {
    if (this.startDate !== undefined) {
      this.model.startDate = moment(this.startDate.format('YYYY/MM/DD'), 'jYYYY/jM/jD').format('YYYY/MM/DD');
    } else {
      this.service.notify.showWarning('تاریخ شروع را تعیین نمایید');
      return;
    }

    if (this.endDate !== undefined) {
      this.model.endDate = moment(this.endDate.format('YYYY/MM/DD'), 'jYYYY/jM/jD').format('YYYY/MM/DD');
    }

    const that = this;
    if (this.model.salesPlanId > 0) {

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
