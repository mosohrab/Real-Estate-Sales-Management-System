import {
  Component, OnInit,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { CountryService } from '../../../services/country.service';
import { CountryModel } from '../../../model/country.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-country-upsert',
  templateUrl: './country-upsert.component.html',
  styleUrls: ['./country-upsert.component.scss'],
  providers: [
    CountryService
  ],

  encapsulation: ViewEncapsulation.None
})
export class CountryUpsertComponent extends WeBaseComponent {

  service: CountryService;
  model = <CountryModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  constructor(service: CountryService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <CountryModel>{};
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <CountryModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {
    const that = this;
    if (this.model.countryId > 0) {

      this.service.edit(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isSuccessAction = true;
              that.onClose();
            } else {
              that.service.notify.showError();
            }
          });
        });

    } else {

      this.service.add(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isSuccessAction = true;
              that.onClose();
            } else {
              that.service.notify.showError();
            }


          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(this.isSuccessAction);
  }


}
