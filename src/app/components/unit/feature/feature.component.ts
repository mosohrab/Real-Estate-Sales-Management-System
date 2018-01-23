import {
  Component, OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import {
  UnitFeatureService,
  UnitFeatureTitleService,
  UnitFeatureValueService,
  UnitFeatureTitleKendoGridService
} from '../../../services/unit-feature.service';
import { FeatureTitleUpsertComponent } from './feature-title-upsert.component';
import { UnitFeatureTitleModel, UnitFeatureValueModel } from '../../../model/unit-feature.model';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  providers: [
    UnitFeatureService,
    UnitFeatureTitleService,
    UnitFeatureValueService,
    UnitFeatureTitleKendoGridService
  ],
  encapsulation: ViewEncapsulation.None
})
export class FeatureComponent extends WeBaseKendoGridComponent {

  private _unitFeatureKendoGridService: UnitFeatureTitleKendoGridService;

  dataItemValue = <UnitFeatureValueModel>{};
  @ViewChild('titleUpsertDialog') titleUpsert: FeatureTitleUpsertComponent;

  constructor(service: UnitFeatureTitleKendoGridService) {
    super(service);
    this._unitFeatureKendoGridService = service;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    const that = this;
    that._service.readGrid();
  }



  addClickedHandler() {
    this.titleUpsert.openDialog();
  }

  editClickedHandler() {
    this.titleUpsert.setDataValue(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }


}
