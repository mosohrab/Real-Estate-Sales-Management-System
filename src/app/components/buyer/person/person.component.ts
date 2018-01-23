import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
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
export class PersonComponent extends WeBaseKendoGridComponent {
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
