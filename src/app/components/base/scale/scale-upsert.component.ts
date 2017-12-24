import {
  Component, OnInit,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { ScaleModel } from '../../../model/base.model';
import { ScaleService, ScaleComboService } from '../../../services/scale.service';
import { BaseComponent } from '../../shared/base.component';
import { OperationResultModel } from '../../../model/operation-result.model';


@Component({
  selector: 'app-scale-upsert',
  templateUrl: './scale-upsert.component.html',
  styleUrls: ['./scale-upsert.component.scss'],
  providers: [
    ScaleService
  ],

  encapsulation: ViewEncapsulation.None
})
export class ScaleUpsertComponent extends BaseComponent {

  service: ScaleService;
  model = <ScaleModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  constructor(service: ScaleService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <ScaleModel>{};
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {

        that.service.operationHandling(x, (r) => {
          that.model = <ScaleModel>r;
          that.isOpenedDialog = true;
        });

      });
  }



  public onOk(form) {
    const that = this;
    if (this.model.scaleId > 0) {

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
