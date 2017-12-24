import {
  Component, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { BaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { ScaleModel } from '../../../model/base.model';
import { ScaleService, ScaleKendoGridService } from '../../../services/scale.service';
import { ScaleUpsertComponent } from './scale-upsert.component';


@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
  providers: [
    ScaleService,
    ScaleKendoGridService
  ]

})
export class ScaleComponent extends BaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: ScaleUpsertComponent;

  constructor(service: ScaleKendoGridService) {
    super(service);
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
  }

  ngOnChangesHandler(changes: SimpleChanges) {
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


