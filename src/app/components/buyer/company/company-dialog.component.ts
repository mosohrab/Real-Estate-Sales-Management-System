import {
  Component, OnInit,
  ViewChild
} from '@angular/core';

import { WeBaseComponent } from '../../we-base.component';
import { SpecialStatusValueComboComponent } from '../special-status-value/special-status-value-combo.component';
import { CompanyModel, CompanyStatusModel } from '../../../model/company.model';
import { CompanyService } from '../../../services/company.service';

import * as moment from 'jalali-moment';


@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss'],
  providers: [
    CompanyService
  ]
})
export class CompanyDialogComponent extends BaseComponent {
  service: CompanyService;
  isOpenedDialog = false;
  wizardStep = 1;
  model = <CompanyModel>{};
  registerDate: any;
  constructor(service: CompanyService) {
    super();
    this.service = service;
    this.model.companyId = 0;
  }

  ngOnInitHandler() {

  }


  public openDialog() {
    this.wizardStep = 1;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {

    this.wizardStep = 1;
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <CompanyModel>r;
          that.registerDate = moment(that.model.registrationDate);
          that.isOpenedDialog = true;
        });

      });
  }

  onClose() {
    this.isOpenedDialog = false;

  }



  public onSaveDetailAndNext(result: boolean) {
    this.wizardStep = 2;

  }
  public onSaveDetailAndClose(result: boolean) {
    this.onClose();

  }

  public companyStatusSaved(result: boolean) {
  }


}
