import {
  Component, OnInit, ViewChild,
  ViewEncapsulation, Input, Output,
  EventEmitter
} from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitRangeService, UnitRangeKendoGridService } from '../../../services/sales.service';
import {
  UnitRangeFilterModel, UnitBundlingFilterAreaModel,
  UnitBundlingFilterModel
} from '../../../model/sales.model'

@Component({
  selector: 'app-unit-bundling-filter',
  templateUrl: './unit-bundling-filter.component.html',
  styleUrls: ['./unit-bundling-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitRangeService,
    UnitRangeKendoGridService
  ]
})
export class UnitBundlingFilterComponent extends WeBaseKendoGridComponent {

  public isOpenedDialog = false;
  @Output() closedDialog = new EventEmitter<UnitBundlingFilterModel>();
  // @Input() filterModel: UnitBundlingFilterModel[];

  filterAreaModel: UnitBundlingFilterAreaModel[];
  filterUsageItemsId: number[];
  filterFeatureId: number[];
  filterSelectiveFeatureId: number[];

  constructor(service: UnitRangeKendoGridService) {
    super(service);

    this.filterAreaModel = new Array<UnitBundlingFilterAreaModel>();
    this.filterAreaModel.push(<UnitBundlingFilterAreaModel>{

    })


  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);
    // this._service.readId = this.salePlanId;
    // this.refresh();
  }




  public openDialog() {
    // this.model = <SalesPlanStatusModel>{};
    // this.model.salesPlanStatusId = 0;
    this.isOpenedDialog = true;
  }


  public openDialogById(id: number) {
    const that = this;
    // this.service.find(id)
    //   .subscribe(x => {
    //     that.service.operationHandling(x, (r) => {
    //       that.model = <SalesPlanStatusModel>r;
    that.isOpenedDialog = true;
    //     });

    //   });
  }




  onOk() {

    this.onClose();

  }



  onClose() {

    let filterModel = <UnitBundlingFilterModel>{};
    
    filterModel.filterAreaModel =new Array<UnitBundlingFilterAreaModel>();
     this.filterAreaModel.forEach((element: UnitBundlingFilterAreaModel) => {
      if (element.fromArea > 0 ||
        element.toArea > 0 ||
        element.usageItemId > 0) {

        filterModel.filterAreaModel.push(element);
      }
    });
    
    
    filterModel.filterUsageItemsId = this.filterUsageItemsId;
    filterModel.filterFeatureId = this.filterFeatureId;
    filterModel.filterSelectiveFeatureId = this.filterSelectiveFeatureId;


    this.isOpenedDialog = false;
    this.closedDialog.emit(filterModel);
  }




}


