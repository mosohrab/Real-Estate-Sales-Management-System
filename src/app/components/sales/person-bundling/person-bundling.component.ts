import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import { BuyerRangeService } from '../../../services/sales.service';
import { SpecialStatuTreeComponent } from '../../buyer/special-status/special-status-tree.component';


@Component({
  selector: 'app-person-bundling',
  templateUrl: './person-bundling.component.html',
  styleUrls: ['./person-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BuyerRangeService
  ]
})
export class PersonBundlingComponent extends WeBaseComponent {

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
