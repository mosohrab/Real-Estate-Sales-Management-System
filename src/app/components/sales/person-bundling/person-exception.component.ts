import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { WeBaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { PersonExceptionService, PersonExceptionKendoGridService } from '../../../services/sales.service';
import { PersonExceptionDialogComponent } from './person-exception-dialog.component';


@Component({
  selector: 'app-person-exception',
  templateUrl: './person-exception.component.html',
  styleUrls: ['./person-exception.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    PersonExceptionService,
    PersonExceptionKendoGridService
  ]
})
export class PersonExceptionComponent extends WeBaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: PersonExceptionDialogComponent;
  constructor(service: PersonExceptionKendoGridService) {
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


