import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitService, UnitKendoGridService } from '../../../services/unit.service';
import {
  UnitBundlingFilterModel,
  UnitBundlingFilterAreaModel
} from '../../../model/sales.model';

import { UnitBundlingFilterComponent } from './unit-bundling-filter.component';


@Component({
  selector: 'app-unit-bundling-search',
  templateUrl: './unit-bundling-search.component.html',
  styleUrls: ['./unit-bundling-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitService,
    UnitKendoGridService
  ]
})
export class UnitBundlingSearchComponent extends WeBaseKendoGridComponent {

  @Input() filterModel = <UnitBundlingFilterModel>{};
  @Input() salePlanId: number;
  @Input() wbsHid: number[];
  @ViewChild('filterDialog') filterDialog: UnitBundlingFilterComponent;

  search: string;
  filtered = false;

  constructor(service: UnitKendoGridService) {
    super(service);
  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);

    if (this.wbsHid !== undefined && this.wbsHid.length > 0) {
      this._service.readIds = this.wbsHid;
    }
    this.refresh();
  }




  refresh(): void {

    const that = this;
    this._service.readGrid(this.search);
  }

  public reload(wbsHid: number[]): void {
    if (wbsHid !== undefined && wbsHid.length > 0) {
      this._service.readIds = this.wbsHid;
    }
    this.refresh();
  }

  public getSelectedIds(): number[] {

    return <number[]>this.dataItemSelected;
  }


  private openFilterDialog(event: boolean) {
    this.filterDialog.openDialog();;

  }



  private clearFilter() {
    this.filterModel = <UnitBundlingFilterModel>{};
    this.state.filter.filters = [];
    this.filtered = false;
    this.setDataState(this.state);
  }

  private closedFilterDialog(event: UnitBundlingFilterModel) {

    this.filterModel = event;
    this.state.filter.filters = [];
    this.filtered = false;

    if (this.filterModel !== undefined) {
      if (this.filterModel.filterAreaModel !== undefined &&
        this.filterModel.filterAreaModel.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.filterUsageItemsId !== undefined &&
        this.filterModel.filterUsageItemsId.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.filterFeatureId !== undefined &&
        this.filterModel.filterFeatureId.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.filterSelectiveFeatureId !== undefined &&
        this.filterModel.filterSelectiveFeatureId.length > 0) {
        this.filtered = true;
      }
    }


    this.filterModel.filterAreaModel.forEach((element: UnitBundlingFilterAreaModel) => {

      if (element.fromArea !== undefined && element.fromArea > 0) {
        this.state.filter.filters.push({
          field: 'nominalArea',
          operator: 'gte',
          value: element.fromArea
        });
      }


      if (element.toArea !== undefined && element.toArea > 0) {
        this.state.filter.filters.push({
          field: 'nominalArea',
          operator: 'lte',
          value: element.toArea
        });
      }

      if (element.usageItemId !== undefined && element.usageItemId > 0) {
        this.state.filter.filters.push({
          field: 'usageItemId',
          operator: 'eq',
          value: element.usageItemId
        });
      }


    });

    this.setDataState(this.state);
    //

    this.refresh();

  }



}


