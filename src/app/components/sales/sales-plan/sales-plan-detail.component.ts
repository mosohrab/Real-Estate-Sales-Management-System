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
  selector: 'app-sales-plan-detail',
  templateUrl: './sales-plan-detail.component.html',
  styleUrls: ['./sales-plan-detail.component.scss'],
  providers: [
    SalesPlanService
  ],

  encapsulation: ViewEncapsulation.None
})
export class SalesPlanDetailComponent extends WeBaseComponent {
  service: SalesPlanService;
  @Input() model = <SalesPlanModel>{};
  startDate: any;
  endDate: any;

  constructor(service: SalesPlanService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {

    // if (this.model !== undefined &&
    //   this.model.salesPlanId > 0) {
    //   const that = this;
    //   this.service.find(this.model.salesPlanId)
    //     .subscribe(x => {
    //       that.service.operationHandling(x, (r) => {
    //         that.model = <SalesPlanModel>r;

    //         if (that.model.startDate !== undefined) {
    //           this.startDate = moment(this.model.startDate);
    //         }
    //         if (that.model.endDate !== undefined) {
    //           this.endDate = moment(this.model.endDate);
    //         }
    //       });

    //     });
    // }
  }


  onAddedPlan($event: SalesPlanModel) {
    debugger;
    this.model = $event;
  }


  // public onOk(form) {
  //   if (this.startDate !== undefined) {
  //     this.model.startDate = moment(this.startDate.format('YYYY/MM/DD'), 'jYYYY/jM/jD').format('YYYY/MM/DD');
  //   } else {
  //     this.service.notify.showWarning('تاریخ شروع را تعیین نمایید');
  //     return;
  //   }

  //   if (this.endDate !== undefined) {
  //     this.model.endDate = moment(this.endDate.format('YYYY/MM/DD'), 'jYYYY/jM/jD').format('YYYY/MM/DD');
  //   }
  //   debugger;
  //   const that = this;
  //   if (this.model.salesPlanId > 0) {

  //     this.service.put(this.model)
  //       .subscribe(res => {
  //         that.service.operationHandling(res, (r) => {
  //           if (<boolean>r === true) {
  //             that.service.notify.showSuccess();

  //           } else {
  //             that.service.notify.showError();
  //           }

  //         });
  //       });

  //   } else {

  //     this.service.add(this.model)
  //       .subscribe(res => {
  //         debugger;
  //         that.service.operationHandling(res, (r: number) => {
  //           debugger;
  //           if (r > 0) {
  //             that.service.notify.showSuccess();
  //             that.model.salesPlanId = r;
  //           } else {
  //             that.service.notify.showError();
  //           }


  //         });
  //       });

  //   }
  // }



}
