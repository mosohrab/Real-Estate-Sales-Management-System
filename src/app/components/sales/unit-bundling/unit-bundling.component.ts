import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';

import {WbsActiveTreeComponent} from '../../wbs/wbs/wbs-active-tree.component';

@Component({
  selector: 'app-unit-bundling',
  templateUrl: './unit-bundling.component.html',
  styleUrls: ['./unit-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnitBundlingComponent extends WeBaseComponent {
  @ViewChild('wbsTree') wbsTree: WbsActiveTreeComponent;


  constructor() {
    super();
  }

  ngOnInitHandler() {
    // this.buyerRangeService.initBusyConfig(this.busyConfig);
  }



  onSaveWbs() {

    this.wbsTree.getCheckedKeys();

  }
}
