import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { WbsActiveTreeComponent } from '../../wbs/wbs/wbs-active-tree.component';


import { UnitRangeService } from '../../../services/sales.service';
import {
  UnitRangeFilterModel, UnitRangeModel,
  UnitRangeBulkModel, UnitBundlingFilterModel
} from '../../../model/sales.model';
import { UnitBundlingSearchComponent } from './unit-bundling-search.component';


@Component({
  selector: 'app-unit-bundling-dialog',
  templateUrl: './unit-bundling-dialog.component.html',
  styleUrls: ['./unit-bundling-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitRangeService
  ],

})
export class UnitBundlingDialogComponent extends WeBaseComponent {
  service: UnitRangeService;
  public isOpenedDialog = false;

  isFiltered = false;
  showSearch = false;
  model = <UnitRangeFilterModel>{};
  filterModel = <UnitBundlingFilterModel>{};
  wbsHid: number[];


  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('wbsTree') wbsTree: WbsActiveTreeComponent;
  @ViewChild('searchForm') searchForm: UnitBundlingSearchComponent;
  @Input() salePlanId: number;


  constructor(service: UnitRangeService) {
    super();
    this.service = service;

  }

  ngOnInitHandler() {
  }


  showChecked(evt: any[]) {
    this.wbsHid = new Array<number>();
    const that = this;

    evt.forEach(element => {
      if (element != undefined && element > 0) {
        that.wbsHid.push(<number>element);
      }
    });

    this.searchForm.reload(this.wbsHid);

  }


  onfiterChanged(filter: UnitBundlingFilterModel) {
   
    if (filter !== undefined) {
      this.isFiltered = true;
    }
    else {
      this.isFiltered = false;
    }
  }


  public openDialog() {
    this.model = <UnitRangeFilterModel>{};
    this.showSearch = false;
    this.isOpenedDialog = true;
  }



  public openDialogById(id: number) {
    const that = this;
    this.model = <UnitRangeFilterModel>{};
    this.showSearch = false;

    // this.service.find(id)
    //   .subscribe(x => {
    //     that.service.operationHandling(x, (r) => {
    //       that.model = <SalesPlanModel>r;
    //       debugger;
    //       if (that.planDetail !== undefined) {
    //         that.planDetail.setPlanModel(that.model);
    //       }

    //       if (that.model.startDate !== undefined) {
    //         this.startDate = moment(this.model.startDate);
    //       }
    //       if (that.model.endDate !== undefined) {
    //         this.endDate = moment(this.model.endDate);
    //       }


    //       that.isOpenedDialog = true;
    //     });

    //   });
  }



  public onSearch() {
    const wbs = this.wbsHid = <number[]>this.wbsTree.checkedKeys;
    this.model.wbsUnitId = wbs;
    this.showSearch = true;
  }

  onOk() {
    const that = this;
    const unitIds = this.searchForm.getSelectedIds();

    let m = <UnitRangeBulkModel>{};
    m.salesPlanId = this.salePlanId;
    m.unitId = unitIds;
    this.service.Sync(m)
      .subscribe((r: boolean) => {
        if (r) {
          that.onClose();
        }
      });

  }




  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(true);
  }




}
