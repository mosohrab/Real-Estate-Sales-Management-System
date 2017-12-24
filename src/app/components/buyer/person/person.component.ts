import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

// kendo
import { State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';


import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';

import { BaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { PersonService, PersonKendoGridService } from '../../../services/person.service';
import { PersonModel } from '../../../model/person.model';
import { PersonDialogComponent } from './person-dialog.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [
    PersonService,
    PersonKendoGridService
  ]
})
export class PersonComponent extends BaseKendoGridComponent {
  @ViewChild('personDialog') dialogUpsert: PersonDialogComponent;

  constructor(router: Router,
    service: PersonKendoGridService
  ) {
    super(service);
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
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
