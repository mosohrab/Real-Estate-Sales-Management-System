import {
  Component, OnInit, Input,
  ViewChild,
  EventEmitter, Output
} from '@angular/core';

import { WeBaseComponent } from '../../we-base.component';
import { UnitModel } from '../../../model/unit.model';
import { UnitService } from '../../../services/unit.service';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';


@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss'],
  providers: [
    UnitService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class UnitDetailComponent extends WeBaseComponent {
  unitId: number;
  service: UnitService;
  model = <UnitModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('usageItemCombo') usageItemCombo: UsageItemComboSingleComponent;


  constructor(service: UnitService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {

  }
  ngAfterViewInitHandler() {

    // this.usageItemCombo;
  }
  public onUsageChange(value: any): void {
    this.usageItemCombo.setUsageId(value);
  }

  public openDialog(wbsHId: number) {
    this.model = <UnitModel>{};
    this.model.wbsHid = wbsHId;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    this.model = <UnitModel>{};
    this.unitId = id;
    if (this.unitId > 0) {
      const that = this;
      this.service.find(this.unitId)
        .subscribe(x => {
          that.service.operationHandling(x, (r: UnitModel) => {
            that.model = <UnitModel>r;
            that.isOpenedDialog = true;
            if (that.usageItemCombo !== undefined) {
              that.usageItemCombo.setUsageId(r.usageId);
            }
          });

        });
    }


  }




  public onOk(form) {
    const that = this;
    if (this.model.unitId > 0) {

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

  public onOpen(): void {

  }


}
