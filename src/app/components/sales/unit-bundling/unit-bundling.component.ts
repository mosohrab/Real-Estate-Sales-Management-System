import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { WeBaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { UnitRangeService, UnitRangeKendoGridService } from '../../../services/sales.service';
import { UnitBundlingDialogComponent } from './unit-bundling-dialog.component';

@Component({
  selector: 'app-unit-bundling',
  templateUrl: './unit-bundling.component.html',
  styleUrls: ['./unit-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitRangeService,
    UnitRangeKendoGridService
  ]
})
export class UnitBundlingComponent extends WeBaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: UnitBundlingDialogComponent;
  constructor(service: UnitRangeKendoGridService) {
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


