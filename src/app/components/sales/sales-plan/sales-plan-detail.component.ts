import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { SalesPlanService } from '../../../services/sales.service';
import { SalesPlanModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import * as moment from 'jalali-moment';
// import { PersonBundlingComponent } from '../person-bundling/person-bundling.component';


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
  // @ViewChild('personBundling') personBundling: PersonBundlingComponent;

  startDate: any;
  endDate: any;

  constructor(service: SalesPlanService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public setPlanModel(model: SalesPlanModel) {
    this.model = model;
    // if(this.personBundling !==undefined){
    //   // this.personBundling.setSalesPlanId(model.salesPlanId);
    // }
  }


  onAddedPlan($event: SalesPlanModel) {
    this.model = $event;
  }


}
