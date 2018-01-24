import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsageItemModel } from '../../../model/usage.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { UsageItemService } from '../../../services/usage.service';

@Component({
  selector: 'app-usage-item-dialog',
  templateUrl: './usage-item-dialog.component.html',
  styleUrls: ['./usage-item-dialog.component.scss'],
  providers: [
    UsageItemService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsageItemDialogComponent extends WeBaseComponent {
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  service: UsageItemService;
  model = <UsageItemModel>{};
  public isOpenedDialog = false;

  constructor(service: UsageItemService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <UsageItemModel>{};
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    this.model = <UsageItemModel>{};
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <UsageItemModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {

    const that = this;
    if (this.model.usageItemId > 0) {
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
