import {
  Component, OnInit,
  Input, Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';


import { UnitFeatureValueKendoGridService } from '../../../services/unit-feature.service';
import { UnitFeatureTitleModel, UnitFeatureValueModel } from '../../../model/unit-feature.model';

import { BaseComponent } from '../../shared/base.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { FeatureValueUpsertComponent } from './feature-value-upsert.component';


@Component({
  selector: 'app-feature-value-grid',
  templateUrl: './feature-value-grid.component.html',
  styleUrls: ['./feature-value-grid.component.scss'],
  providers: [
    UnitFeatureValueKendoGridService
  ],

  encapsulation: ViewEncapsulation.None
})
export class FeatureValueGridComponent extends BaseKendoGridComponent {

  _service: UnitFeatureValueKendoGridService;

  @Input() dataItem = <UnitFeatureValueModel>{};
  @ViewChild('dialogUpsert') dialogUpsert: FeatureValueUpsertComponent;
  // model = <SpecialStatusValueModel>{};
  public opened = false;
  constructor(service: UnitFeatureValueKendoGridService) {
    super(service);
    this._service = service;


  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
  }
  ngAfterViewInitHandler() {

  }

  public setValueItem(e: SelectionEvent) {

    this.dataItem.unitFeatureValueId = 0;
    this.dataItem.featureTitleId = 0;
    this.dataItem.featureTitleName = '';
    this.dataItem.featureValue = '';

    if (e.selectedRows.length > 0) {
      const m = <UnitFeatureTitleModel>e.selectedRows[0].dataItem;
      this.dataItem.featureTitleId = m.unitFeatureTitleId;
      this.dataItem.featureTitleName = m.featureTitleName;
      this._service.readId = m.unitFeatureTitleId;
      this.refresh();
    }
  }


  private refresh(): void {
    this._service.readGrid();

  }

  addClickedHandler() {
    this.dialogUpsert.openDialog(this.dataItem.featureTitleId);
  }

  editClickedHandler() {
    this.dialogUpsert.setDataValue(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }


  deleteAllClickedHandler() {
    this._service.removeAll();
  }



}
