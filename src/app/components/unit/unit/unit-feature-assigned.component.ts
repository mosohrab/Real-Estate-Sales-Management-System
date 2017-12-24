import {
  Component, OnInit, Input,
  ViewChild,
  EventEmitter, Output
} from '@angular/core';

import { BaseComponent } from '../../shared/base.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { UnitFeatureAssignedModel, UnitModel } from '../../../model/unit.model';
import { UnitService, UnitFeatureAssignedService, UnitFeatureAssignedKendoGridService } from '../../../services/unit.service';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';
import { UnitFeatureAssignedUpsertComponent } from './unit-feature-assigned-upsert.component';

@Component({
  selector: 'app-unit-feature-assigned',
  templateUrl: './unit-feature-assigned.component.html',
  styleUrls: ['./unit-feature-assigned.component.scss'],
  providers: [
    UnitService,
    UnitFeatureAssignedService,
    UnitFeatureAssignedKendoGridService
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ],
  preserveWhitespaces: false
})
export class UnitFeatureAssignedComponent extends BaseKendoGridComponent {
  unitService: UnitService;
  service: UnitFeatureAssignedKendoGridService;
  model = <UnitFeatureAssignedModel>{};
  public isOpenedDialog = false;
  private isSuccessAction = false;
  @Output() closedDialog = new EventEmitter<boolean>();

  @ViewChild('dialogUpsert') dialogUpsert: UnitFeatureAssignedUpsertComponent;

  constructor(
    service: UnitFeatureAssignedKendoGridService,
    unitService: UnitService) {
    super(service);
    this.service = service;
    this.unitService = unitService;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);

  }
  ngAfterViewInitHandler() {
  }


  public openDialog(unitId: number) {
    this.model.unitId = unitId;
    this.isOpenedDialog = true;
  }

  public openDialogById(id: number) {
    this.service.readId = id;
    this.service.readGrid();

    if (id > 0) {
      const that = this;
      this.unitService.find(id)
        .subscribe(x => {
          that.unitService.operationHandling(x, (r: UnitModel) => {

            const m = <UnitModel>r;
            that.model.unitId = m.unitId;
            that.model.unitName = m.unitTitle;
            that.isOpenedDialog = true;

          });

        });
    }


  }



  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(this.isSuccessAction);
  }


  addClickedHandler() {
    this.dialogUpsert.openDialog(this.model.unitId);
  }

  editClickedHandler() {
    this.dialogUpsert.openDialogById(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }


}
