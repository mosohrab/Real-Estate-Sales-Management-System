import {
  Component, OnInit,
  ViewChild
} from '@angular/core';

import { BaseComponent } from '../../shared/base.component';
import { SpecialStatusValueComboComponent } from '../special-status-value/special-status-value-combo.component';
import { PersonModel, PersonStatusModel } from '../../../model/person.model';
import { PersonService } from '../../../services/person.service';

import * as moment from 'jalali-moment';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss'],
  providers: [
    PersonService
  ]
})
export class PersonDialogComponent extends BaseComponent {
  service: PersonService;
  isOpenedDialog = false;
  wizardStep = 1;
  model = <PersonModel>{};
  birthDate: any;
  constructor(service: PersonService) {
    super();
    this.service = service;
    this.model.personId = 0;
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
          that.model = <PersonModel>r;
          that.birthDate = moment(r.birthDate);
          that.isOpenedDialog = true;
        });

      });
  }

  onClose() {
    this.isOpenedDialog = false;

  }



  public onSaveDetailAndNext(result: number) {
    this.model.personId = result;
    this.wizardStep = 2;

  }
  public onSaveDetailAndClose(result: boolean) {
    this.onClose();

  }

  public onStatusSaved(result: boolean) {
  }


}
