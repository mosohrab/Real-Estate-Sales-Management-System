import {
  Component, OnInit,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { WbsService } from '../../../services/wbs.service';
import { WbsModel } from '../../../model/wbs.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-wbs-upsert',
  templateUrl: './wbs-upsert.component.html',
  styleUrls: ['./wbs-upsert.component.scss'],
  providers: [
    WbsService
  ],

  encapsulation: ViewEncapsulation.None
})
export class WbsUpsertComponent extends WeBaseComponent {

  service: WbsService;
  model = <WbsModel>{};
  public isOpenedDialog = false;

  constructor(service: WbsService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog(model: WbsModel) {
    this.model = model;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <WbsModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {
    const that = this;
    if (this.model.wbsHid > 0) {

      this.service.edit(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.isOpenedDialog = false;
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
              that.isOpenedDialog = false;
            } else {
              that.service.notify.showError();
            }


          });
        });

    }
  }

  onClose() {
    this.isOpenedDialog = false;

  }


}
