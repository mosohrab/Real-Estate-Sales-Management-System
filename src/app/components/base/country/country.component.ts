import {
  Component, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { BaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { CountryKendoGridService } from '../../../services/country.service';
import { CountryModel } from '../../../model/country.model';
import { CountryUpsertComponent } from './country-upsert.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [
    CountryKendoGridService
  ]

})
export class CountryComponent extends BaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: CountryUpsertComponent;

  constructor(service: CountryKendoGridService) {
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


