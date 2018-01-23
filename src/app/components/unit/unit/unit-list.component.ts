import {
  Component, ViewChild,
  Input, Output,
  ViewEncapsulation
} from '@angular/core';

import { OperationResultModel } from '../../../core/model/operation-result.model';
import { ToolbarButton, ToolbarButtonClickEvent } from '../../../core/model/toolbar-button';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitService, UnitKendoGridService } from '../../../services/unit.service';
import { WbsModel } from '../../../model/wbs.model';
import { WbsService } from '../../../services/wbs.service';
import { UnitDetailComponent } from './unit-detail.component';
import { UnitFeatureAssignedComponent } from './unit-feature-assigned.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  providers: [
    UnitService,
    UnitKendoGridService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UnitListComponent extends WeBaseKendoGridComponent {
  wbsService: WbsService;
  wbsModel = <WbsModel>{};
  buttons = new Array<ToolbarButton>();

  @Input() wbsHid: number;

  @ViewChild('dialogUpsert') dialogUpsert: UnitDetailComponent;
  @ViewChild('featuredialog') featuredialogUpsert: UnitFeatureAssignedComponent;


  constructor(service: UnitKendoGridService, wbsService: WbsService) {
    super(service);
    this.wbsService = wbsService;



  }

  public ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    if (this.wbsHid > 0) {
      this.initUnits(this.wbsHid);
    }

  }
  public ngAfterViewInitHandler() {
    this.buttons.push(<ToolbarButton>{
      icon: 'fa fa-cube fa-lg',
      title: 'ویژگی',
      tooltip: 'ویژگی',
      clicked: (e: ToolbarButtonClickEvent) => {
        if (this.dataItemSelected.length < 1) {
          this.wbsService.notify.showWarning('هیچ رکوردی انتخاب نشده است');
          return;
        }

        this.featuredialogUpsert.openDialogById(this.dataItemSelected[0]);
      }
    });
    // this.buttons.push(<ToolbarButton>{
    //   icon: 'fa fa-check fa-lg',
    //   title: 'check',
    //   tooltip: 'dsfkjcheckdslkf',
    //   clicked: (e: ToolbarButtonClickEvent) => {
    //     debugger;
    //     this.featuredialogUpsert.openDialogById(this.dataItemSelected[0]);
    //   }
    // });

  }

  private closedDialog(event: boolean) {
    if (event) {
      this._service.readGrid();
    }
  }
  private closedFeatureDialog(event: boolean) {
    if (event) {
      this._service.readGrid();
    }
  }

  public initUnits(wbsHid: number) {
    const that = this;
    this.wbsHid = wbsHid;
    this.wbsService.find(this.wbsHid)
      .subscribe((res: OperationResultModel) => {
        that.wbsService.operationHandling(res, (r: WbsModel) => {
          that.wbsModel = r;
        });
      });

    this._service.readId = this.wbsHid;
    this._service.readGrid();

  }


  addClickedHandler() {
    this.dialogUpsert.openDialog(this.wbsHid);
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
