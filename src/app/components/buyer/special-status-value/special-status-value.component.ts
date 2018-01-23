import {
  Component, OnInit,
  Input, Output, ViewChild,
  EventEmitter, ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

import { State } from '@progress/kendo-data-query';
import {
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { SpecialStatusValueService } from '../../../services/special-status-value.service';
import { SpecialStatusModel, SpecialStatusValueModel } from '../../../model/special-status.model';

import { WeBaseComponent } from '../../we-base.component';
import { SpecialStatusValueGridComponent } from './special-status-value-grid.component';
import { OperationResultModel } from '../../../model/operation-result.model';

@Component({
  selector: 'app-special-status-value',
  templateUrl: './special-status-value.component.html',
  styleUrls: ['./special-status-value.component.scss'],
  providers: [
    SpecialStatusValueService

  ]
})
export class SpecialStatusValueComponent extends WeBaseComponent {
  _service: SpecialStatusValueService;
  @Input()
  dataItemValue = <SpecialStatusValueModel>{};

  @Output() changeStatus: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();
  @ViewChild('valueGrid') valueGrid: SpecialStatusValueGridComponent;

  constructor(service: SpecialStatusValueService) {
    super();
    this._service = service;
  }

  ngOnInitHandler() {
  }


  private closedDialog(event: boolean) {
    if (event) {
      this.valueGrid.refresh();
    }

  }

  public setStatusItem(e: SelectionEvent) {

    this.valueGrid.setStatusItem(e);

    this.dataItemValue.specialStatusId = 0;
    this.dataItemValue.descreption = '';
    this.dataItemValue.haveMoreDetial = false;
    this.dataItemValue.moreSpecialStatusLable = '';
    this.dataItemValue.name = '';
    this.dataItemValue.specialStatusValueId = 0;


    if (e.selectedRows.length > 0) {
      const m = <SpecialStatusModel>e.selectedRows[0].dataItem;
      this.dataItemValue.specialStatusId = m.specialStatusId;
      this.dataItemValue.specialStatusName = m.name;
    }
    this.changeStatus.emit(e);
  }




}
