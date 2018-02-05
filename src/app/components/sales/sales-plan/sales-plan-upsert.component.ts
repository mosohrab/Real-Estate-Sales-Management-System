import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { SalesPlanService } from '../../../services/sales.service';
import { SalesPlanModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import * as moment from 'jalali-moment';


@Component({
  selector: 'app-sales-plan-upsert',
  templateUrl: './sales-plan-upsert.component.html',
  styleUrls: ['./sales-plan-upsert.component.scss'],
  providers: [
    SalesPlanService
  ],

  encapsulation: ViewEncapsulation.None
})
export class SalesPlanUpsertComponent extends WeBaseComponent {
  service: SalesPlanService;
  model = <SalesPlanModel>{};
  startDate: any;
  endDate: any;
  @Input() id: number;

  constructor(service: SalesPlanService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {

    if (this.id !== undefined) {
      const that = this;
      this.service.find(this.id)
        .subscribe(x => {
          that.service.operationHandling(x, (r) => {
            that.model = <SalesPlanModel>r;

            if (that.model.startDate !== undefined) {
              this.startDate = moment(this.model.startDate);
            }
            if (that.model.endDate !== undefined) {
              this.endDate = moment(this.model.endDate);
            }
          });

        });
    }
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

            } else {
              that.service.notify.showError();
            }


          });
        });

    }
  }



}
