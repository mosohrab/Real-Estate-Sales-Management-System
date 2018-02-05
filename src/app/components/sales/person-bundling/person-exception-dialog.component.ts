import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { PersonExceptionService } from '../../../services/sales.service';
import { PersonExceptionModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import * as moment from 'jalali-moment';


@Component({
  selector: 'app-person-exception-dialog',
  templateUrl: './person-exception-dialog.component.html',
  styleUrls: ['./person-exception-dialog.component.scss'],
  providers: [
    PersonExceptionService
  ],

  encapsulation: ViewEncapsulation.None
})
export class PersonExceptionDialogComponent extends WeBaseComponent {
  service: PersonExceptionService;
  model = <PersonExceptionModel>{};
  public isOpenedDialog = false;
  @Output() closedDialog = new EventEmitter<boolean>();
  startDate: any;
  endDate: any;

  constructor(service: PersonExceptionService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <PersonExceptionModel>{};
    this.model.personExceptionId = 0;
    this.isOpenedDialog = true;
  }


  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <PersonExceptionModel>r;
          that.isOpenedDialog = true;
        });

      });
  }




  public onOk(form) {
    const that = this;
    if (this.model.salesPlanId > 0) {

      this.service.put(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
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
    this.closedDialog.emit(true);
  }



}
