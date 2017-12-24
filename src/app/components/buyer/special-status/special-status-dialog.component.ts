import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { SpecialStatusModel } from '../../../model/special-status.model';
import { BaseComponent } from '../../shared/base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { SpecialStatusService } from '../../../services/special-status.service';

@Component({
  selector: 'app-special-status-dialog',
  templateUrl: './special-status-dialog.component.html',
  styleUrls: ['./special-status-dialog.component.scss'],
  providers: [
    SpecialStatusService
  ],
  encapsulation: ViewEncapsulation.None
})
export class SpecialStatusDialogComponent extends BaseComponent {
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  service: SpecialStatusService;
  model = <SpecialStatusModel>{};
  public isOpenedDialog = false;
  statusTypeItems: Array<string> = [
    'اشخاص حقیقی و حقوقی',
    'اشخاص حقیقی',
    'اشخاص حقوقی'];
  statusTypeItem = this.statusTypeItems[0];

  constructor(service: SpecialStatusService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <SpecialStatusModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {
    if (this.statusTypeItem === this.statusTypeItems[1]) {
      this.model.statusType = false;
    } else if (this.statusTypeItem === this.statusTypeItems[2]) {
      this.model.statusType = true;
    } else {
      this.model.statusType = null;
    }
    const that = this;
    if (this.model.specialStatusId > 0) {
      this.service.edit(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            that.service.notify.showSuccess();
            this.isSuccessAction = true;
            that.onClose();
          });
        });

    } else {
      this.service.add(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            that.service.notify.showSuccess();
            this.isSuccessAction = true;
            that.onClose();
          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(this.isSuccessAction);

  }


}
