import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';

import { CityModel } from '../../../model/city.model';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { BaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { CityService, CityKendoGridService } from '../../../services/city.service';
import { CityDetailComponent } from '../city-detail/city-detail.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService, CityKendoGridService],

})
export class CityComponent extends BaseKendoGridComponent {
  @ViewChild('dialogUpsert') dialogUpsert: CityDetailComponent;

  constructor(service: CityKendoGridService) {
    super(service);

  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
  }

  private refresh(): void {
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
