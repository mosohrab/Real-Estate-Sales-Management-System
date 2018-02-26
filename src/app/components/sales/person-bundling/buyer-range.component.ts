import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import{ BuyerRangeBulkModel,BuyerRangeModel,
BuyerRangeAggregateModel,PersonBundlingType} from '../../../model/sales.model';
import {BuyerRangeService} from '../../../services/sales.service';

@Component({
  selector: 'app-buyer-range',
  templateUrl: './buyer-range.component.html',
  styleUrls: ['./buyer-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
     BuyerRangeService
  ]
})
export class BuyerRangeComponent extends WeBaseComponent {

  @Input() salePlanId: number;
  @Input() fillterType: PersonBundlingType;

  isSelectAll = false;
  
  constructor(private buyerRangeService: BuyerRangeService) {
    super();
  }

  // ngOnInitHandler() {
  // //  this.buyerRangeService.initBusyConfig(this.busyConfig);
  // }


  // setSalesPlanId(id: number) {
  //    this.salePlanId = id;
  // }

  onSaveAccessAll() {
    const that = this;

    const m = <BuyerRangeBulkModel>{};
    m.buyerRange = <BuyerRangeModel>{
      salesPlanId: this.salePlanId,
      fillterType: this.fillterType,
      isSelectAll: true
    };

    this.buyerRangeService.Sync(m)
      .subscribe((r: boolean) => {

      });


  }


}
