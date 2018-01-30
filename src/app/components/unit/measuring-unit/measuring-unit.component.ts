
import { Component, ViewEncapsulation, ViewChild, Input, Output } from '@angular/core';
import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { MeasuringUnitService, MeasuringUnitKendoGridService } from '../../../services/measuring-unit.service';
import { MeasuringUnitDialogComponent } from './measuring-unit-dialog.component';
import { MeasuringUnitModel } from '../../../model/unit.model';

@Component({
  selector: 'app-measuring-unit',
  templateUrl: './measuring-unit.component.html',
  styleUrls: ['./measuring-unit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MeasuringUnitService,
    MeasuringUnitKendoGridService
  ]
})
export class MeasuringUnitComponent extends WeBaseKendoGridComponent {
  private _unitFeatureKendoGridService: MeasuringUnitKendoGridService;
  dataItemValue = <MeasuringUnitModel>{};
  @ViewChild('titleUpsertDialog') titleUpsert: MeasuringUnitDialogComponent;

  constructor(service: MeasuringUnitKendoGridService) {
    super(service);
    this._unitFeatureKendoGridService = service;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    const that = this;
    that._service.readGrid();
  }

  private closedDialog(event: boolean) {
    if (event) {
      this._service.readGrid();
    }

  }

  addClickedHandler() {
    this.titleUpsert.openDialog();
  }

  editClickedHandler() {
    this.titleUpsert.setDataValue(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }

}


