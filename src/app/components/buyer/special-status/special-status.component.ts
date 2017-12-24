import {
  Component, OnInit,
  Input, Output, ViewChild
} from '@angular/core';

import { State } from '@progress/kendo-data-query';
import {
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { SpecialStatusModel } from '../../../model/special-status.model';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { SpecialStatusService, SpecialStatusKendoGridService } from '../../../services/special-status.service';
import { SpecialStatusUpsertComponent } from './special-status-upsert.component';
import { SpecialStatusValueUpsertComponent } from '../special-status-value/special-status-value-upsert.component';
import { SpecialStatusDialogComponent } from './special-status-dialog.component';

@Component({
  selector: 'app-special-status',
  templateUrl: './special-status.component.html',
  styleUrls: ['./special-status.component.scss'],
  providers: [
    SpecialStatusService,
    SpecialStatusKendoGridService]
})
export class SpecialStatusComponent extends BaseKendoGridComponent {
  service: SpecialStatusKendoGridService;
  model = <SpecialStatusModel>{};
  statusTypeItems: Array<string> = [
    'اشخاص حقیقی و حقوقی',
    'اشخاص حقیقی',
    'اشخاص حقوقی'];
  statusTypeItem = this.statusTypeItems[0];

  // @ViewChild('statusDialogUpsert') statusDialogUpsert: SpecialStatusUpsertComponent;
  @ViewChild('statusDialog') statusDialog: SpecialStatusDialogComponent;

  constructor(service: SpecialStatusKendoGridService) {
    super(service);
    this.service = service;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
  }

  private refresh(): void {
    this._service.readGrid();

  }
  private closedDialog(event: boolean) {
    if (event) {
      this.refresh();
    }

  }

  addClickedHandler() {
    this.statusDialog.openDialog();
  }

  editClickedHandler() {
    this.statusDialog.openDialogById(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }


  deleteAllClickedHandler() {
    this._service.removeAll();
  }


}
