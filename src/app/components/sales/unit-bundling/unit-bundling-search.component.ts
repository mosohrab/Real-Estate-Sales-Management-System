import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output,EventEmitter } from '@angular/core';

import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitBundlingService, UnitBundlingKendoGridService } from '../../../services/sales.service';
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
    UnitBundlingService,
    UnitBundlingKendoGridService
  ]
})
export class UnitBundlingSearchComponent extends WeBaseKendoGridComponent {

  @Input() filterModel = <UnitBundlingFilterModel>{};
  @Input() salePlanId: number;
  @Input() wbsHid: number[];
  @Output() fiterChanged=new EventEmitter<UnitBundlingFilterModel>();
  
  @ViewChild('filterDialog') filterDialog: UnitBundlingFilterComponent;

  search: string;
  filtered = false;

  constructor(service: UnitBundlingKendoGridService) {
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

    if (this.search) {
      this.filtered = true;
    }

    const that = this;
    this._service.readGrid(this.search, this.filterModel);
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
    this.search = '';
    this.filtered = false;
    this.setDataState(this.state);
    this.fiterChanged.emit(undefined);
    this.refresh();
  }

  private closedFilterDialog(event: UnitBundlingFilterModel) {

    this.filterModel = event;
    this.state.filter.filters = [];
    this.setFiltered();

    this.filterModel.areaModel.forEach((element: UnitBundlingFilterAreaModel) => {

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

    //
    this.filterModel.usageItemsIds.forEach((element: number) => {

      // if (element) {
      //   this.state.filter.filters.push({
      //     field: 'usageItemId',
      //     operator: 'eq',
      //     value: element
      //   });
      // }

    });
    this.setDataState(this.state);
    //
    //

    this.fiterChanged.emit(this.filterModel);
    this.refresh();

  }



  setFiltered() {
    this.filtered = false;

    if (this.filterModel !== undefined) {
      if (this.filterModel.areaModel !== undefined &&
        this.filterModel.areaModel.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.usageItemsIds !== undefined &&
        this.filterModel.usageItemsIds.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.featureIds !== undefined &&
        this.filterModel.featureIds.length > 0) {
        this.filtered = true;
      }

      if (this.filterModel.selectiveFeatureIds !== undefined &&
        this.filterModel.selectiveFeatureIds.length > 0) {
        this.filtered = true;
      }
    }
  }

}


