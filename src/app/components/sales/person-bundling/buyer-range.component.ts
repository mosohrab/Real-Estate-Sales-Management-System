import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import { BuyerRangeService } from '../../../services/sales.service';
import { SpecialStatuTreeComponent } from '../../buyer/special-status/special-status-tree.component';


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
  @ViewChild('statusTree') statusTree: SpecialStatuTreeComponent;

  constructor(private buyerRangeService: BuyerRangeService) {
    super();
  }

  ngOnInitHandler() {
    this.buyerRangeService.initBusyConfig(this.busyConfig);
  }



  onSaveStatus() {

  }
}
