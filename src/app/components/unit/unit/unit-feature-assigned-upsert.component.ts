import {
  Component, OnInit, Input,
  ViewChild,
  EventEmitter, Output
} from '@angular/core';

import { BaseComponent } from '../../shared/base.component';
import { UnitFeatureAssignedModel, UnitModel } from '../../../model/unit.model';
import { UnitService, UnitFeatureAssignedService } from '../../../services/unit.service';
import {
  UnitFeatureService, UnitFeatureComboService,
  UnitFeatureTitleService, UnitFeatureTitleComboService,
  UnitFeatureValueService, UnitFeatureValueComboService
} from '../../../services/unit-feature.service';

import { FeatureTitleComboSingleComponent } from '../../unit/feature/feature-title-combo-single.component';
import { FeatureValueComboSingleComponent } from '../../unit/feature/feature-value-combo-single.component';


@Component({
  selector: 'app-unit-feature-assigned-upsert',
  templateUrl: './unit-feature-assigned-upsert.component.html',
  styleUrls: ['./unit-feature-assigned-upsert.component.scss'],
  providers: [
    UnitService,
    UnitFeatureAssignedService,
    UnitFeatureService,
    UnitFeatureComboService,
    UnitFeatureTitleService,
    UnitFeatureTitleComboService,
    UnitFeatureValueService,
    UnitFeatureValueComboService
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ],
  preserveWhitespaces: false
})
export class UnitFeatureAssignedUpsertComponent extends BaseComponent {
  unitService: UnitService;
  service: UnitFeatureAssignedService;
  model = <UnitFeatureAssignedModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  @ViewChild('featureTitleCombo') featureTitleCombo: FeatureTitleComboSingleComponent;
  @ViewChild('featureValueCombo') featureValueCombo: FeatureValueComboSingleComponent;


  constructor(
    service: UnitFeatureAssignedService,
    unitService: UnitService) {
    super();
    this.service = service;
    this.unitService = unitService;
  }

  ngOnInitHandler() {

  }
  ngAfterViewInitHandler() {
  }


  public openDialog(unitId: number) {
    this.model.unitId = unitId;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {

    if (id > 0) {
      const that = this;
      this.unitService.find(id)
        .subscribe(x => {
          that.service.operationHandling(x, (r: UnitModel) => {
            const m = <UnitModel>r;
            that.model.unitId = m.unitId;
            that.model.unitName = m.unitTitle;
            that.isOpenedDialog = true;

          });

        });
    }


  }


  public onFeatureChange(value: any): void {
    this.featureTitleCombo.setFeatureId(value);
  }
  public onFeatureTitleChange(value: any): void {
    this.featureValueCombo.setFeatureTitle(value);
  }


  public onOk(form) {
    const that = this;
    if (this.model.unitFeatureAssignedId > 0) {

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
