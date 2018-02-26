
import {
  Component, OnInit, Input,
  ViewEncapsulation, ViewChild
} from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { BuyerRangeValueService, BuyerRangeValueKendoGridService } from '../../../services/sales.service';
import { PersonBundlingType } from '../../../model/sales.model'
import { PersonBundlingDialogComponent } from './person-bundling-dialog.component';

@Component({
  selector: 'app-buyer-range-partial',
  templateUrl: './buyer-range-partial.component.html',
  styleUrls: ['./buyer-range-partial.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BuyerRangeValueService,
    BuyerRangeValueKendoGridService
  ]
})
export class BuyerRangePartialComponent extends WeBaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: PersonBundlingDialogComponent;
  @Input() salePlanId: number;
  @Input() hasPermission = true;
  @Input() fillterType: PersonBundlingType;
  checkeBoxId: string;
  constructor(service: BuyerRangeValueKendoGridService) {
    super(service);

    this.checkeBoxId=`chk-${<number>this.fillterType}-${this.salePlanId}`
  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);
    this._service.readId = this.salePlanId;
    this.refresh();
  }


  private closedDialog(event: boolean) {
    if (event) {
      this.refresh();
    }

  }

  private refresh(): void {
    const that = this;
    this._service.readGrid();
  }



  addClickedHandler() {
    this.dialogUpsert.openDialog();
  }

  editClickedHandler() {
    this.dialogUpsert.openDialogById(this.dataItemSelected[0]);
  }

  leteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }



}


