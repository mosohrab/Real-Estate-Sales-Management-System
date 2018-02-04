import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { WeBaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { SalesPlanStatusService, SalesPlanStatusKendoGridService } from '../../../services/sales.service';
import { SalesPlanStatusDialogComponent } from './sales-plan-status-dialog.component';


@Component({
  selector: 'app-sales-plan-status',
  templateUrl: './sales-plan-status.component.html',
  styleUrls: ['./sales-plan-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SalesPlanStatusService,
    SalesPlanStatusKendoGridService
  ]
})
export class SalesPlanStatusComponent extends WeBaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: SalesPlanStatusDialogComponent;

  constructor(service: SalesPlanStatusKendoGridService) {
    super(service);
  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);
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

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }



}


