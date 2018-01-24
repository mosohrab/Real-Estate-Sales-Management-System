import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { UsageModel } from '../../../model/usage.model';

import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { UsageService } from '../../../services/usage.service';

@Component({
  selector: 'app-usage-dialog',
  templateUrl: './usage-dialog.component.html',
  styleUrls: ['./usage-dialog.component.scss'],
  providers: [
    UsageService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsageDialogComponent extends WeBaseComponent {
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  service: UsageService;
  model = <UsageModel>{};
  public isOpenedDialog = false;

  constructor(service: UsageService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <UsageModel>{};
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    this.model = <UsageModel>{};
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <UsageModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {

    const that = this;
    if (this.model.usageId > 0) {
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
