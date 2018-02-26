import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitRangeService, UnitRangeKendoGridService } from '../../../services/sales.service';
import { UnitRangeFilterModel } from '../../../model/sales.model'
import{ UnitBundlingFilterComponent} from './unit-bundling-filter.component';


@Component({
  selector: 'app-unit-bundling-search',
  templateUrl: './unit-bundling-search.component.html',
  styleUrls: ['./unit-bundling-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitRangeService,
    UnitRangeKendoGridService
  ]
})
export class UnitBundlingSearchComponent extends WeBaseKendoGridComponent {

  @Input() filterModel = <UnitRangeFilterModel>{};
  @Input() salePlanId: number;
  @ViewChild('filterDialog') filterDialog: UnitBundlingFilterComponent;
  
  search: string;

  constructor(service: UnitRangeKendoGridService) {
    super(service);
  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);
    this._service.readId = this.salePlanId;
    this.refresh();
  }




  private refresh(): void {
    const that = this;
    this._service.readGrid(this.search, this.filterModel);
  }

  public getSelectedIds(): number[] {

    return <number[]>this.dataItemSelected;
  }


  private openFilterDialog(event: boolean) {
   this.filterDialog.openDialog();;

  }
  private closedFilterDialog(event: boolean) {
    if (event) {
      this.refresh();
    }

  }



}


