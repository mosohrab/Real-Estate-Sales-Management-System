import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { WeBaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { SalesPlanService, SalesPlanKendoGridService } from '../../../services/sales.service';
import { SalesPlanDialogComponent } from './sales-plan-dialog.component';


@Component({
  selector: 'app-sales-plan',
  templateUrl: './sales-plan.component.html',
  styleUrls: ['./sales-plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SalesPlanService,
    SalesPlanKendoGridService
  ]
})
export class SalesPlanComponent extends WeBaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: SalesPlanDialogComponent;
 constructor(service: SalesPlanKendoGridService) {
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


