import {
  Component, OnInit,
  Input, Output, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { SpecialStatusValueKendoGridService } from '../../../services/special-status-value.service';
import { SpecialStatusModel, SpecialStatusValueModel } from '../../../model/special-status.model';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { SpecialStatusValueUpsertComponent } from './special-status-value-upsert.component';

@Component({
  selector: 'app-special-status-value-grid',
  templateUrl: './special-status-value-grid.component.html',
  styleUrls: ['./special-status-value-grid.component.scss'],
  providers: [SpecialStatusValueKendoGridService]
})
export class SpecialStatusValueGridComponent extends WeBaseKendoGridComponent {
  _service: SpecialStatusValueKendoGridService;

  @Input() dataItem = <SpecialStatusValueModel>{};
  @ViewChild('statusValuedialogUpsert') valuedialogUpsert: SpecialStatusValueUpsertComponent;

  // model = <SpecialStatusValueModel>{};
  public opened = false;
  constructor(service: SpecialStatusValueKendoGridService) {
    super(service);
    this._service = service;

    // this.state.filter = {
    //   logic: 'and',
    //   filters: [
    //     { field: 'name', operator: 'contains', value: '' }
    //   ]
    // };
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
  }
  ngAfterViewInitHandler() {

  }

  public setStatusItem(e: SelectionEvent) {

    this.dataItem.specialStatusId = 0;
    this.dataItem.descreption = '';
    this.dataItem.haveMoreDetial = false;
    this.dataItem.moreSpecialStatusLable = '';
    this.dataItem.name = '';
    this.dataItem.specialStatusValueId = 0;


    if (e.selectedRows.length > 0) {
      const m = <SpecialStatusModel>e.selectedRows[0].dataItem;
      this.dataItem.specialStatusId = m.specialStatusId;
      this.dataItem.specialStatusName = m.name;
      this._service.readId = m.specialStatusId;
      this.refresh();
    }
  }


  public refresh(): void {
    this.dataItem.descreption = '';
    // this.model.haveMoreDetial = false;
    // this.model.moreSpecialStatusLable = '';
    // this.model.specialStatusValueId = 0;
    this._service.readGrid();

  }


  public onSaveDetail(form) {

    this._service.save(this.dataItem,
      this.dataItem.specialStatusValueId < 1);

  }




  addClickedHandler() {
    const id = this.dataItem.specialStatusId;
    if (id === undefined || id === null || id === 0) {
      this._service.notify.showWarning('ابتدا گروه را انتخاب نمایید');
      return;
    }
    this.valuedialogUpsert.openDialog(
      this.dataItem.specialStatusId,
      this.dataItem.specialStatusName);
  }

  editClickedHandler() {
    this.valuedialogUpsert.openDialogById(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }


  deleteAllClickedHandler() {
    this._service.removeAll();
  }



}
