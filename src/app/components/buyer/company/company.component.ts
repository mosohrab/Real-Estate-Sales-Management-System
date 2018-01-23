import {
  Component, OnInit,
  Input, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { CompanyService, CompanyKendoGridService } from '../../../services/company.service';
import { CompanyModel } from '../../../model/company.model';
import { CompanyDialogComponent } from './company-dialog.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [
    CompanyService,
    CompanyKendoGridService
  ]
})
export class CompanyComponent extends WeBaseKendoGridComponent {
  _router: Router;
  @ViewChild('companyDialog') dialogUpsert: CompanyDialogComponent;


  constructor(router: Router,
    service: CompanyKendoGridService
  ) {
    super(service);
    this._router = router;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this._service.readGrid();
  }


  // public addItem() {
  //   this._router.navigate(['/company/detail']);

  // }
  // public editItem(id) {
  //   this._router.navigate(['/company/detail', id]);

  // }



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
