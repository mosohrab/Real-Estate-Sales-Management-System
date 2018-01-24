import {
  Component, OnInit,
  Input, Output, ViewChild, ViewEncapsulation
} from '@angular/core';

import { State } from '@progress/kendo-data-query';
import {
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import { UsageItemModel } from '../../../model/usage.model';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UsageItemService, UsageItemKendoGridService } from '../../../services/usage.service';
import { UsageItemDialogComponent } from './usage-item-dialog.component';

@Component({
  selector: 'app-usage-item',
  templateUrl: './usage-item.component.html',
  styleUrls: ['./usage-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UsageItemService,
    UsageItemKendoGridService]
})
export class UsageItemComponent extends WeBaseKendoGridComponent {
  service: UsageItemKendoGridService;
  model = <UsageItemModel>{};

  // @ViewChild('statusDialogUpsert') statusDialogUpsert: SpecialStatusUpsertComponent;
  @ViewChild('statusDialog') statusDialog: UsageItemDialogComponent;

  constructor(service: UsageItemKendoGridService) {
    super(service);
    this.service = service;
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
  }

  private refresh(): void {
    this._service.readGrid();

  }
  private closedDialog(event: boolean) {
    if (event) {
      this.refresh();
    }

  }

  addClickedHandler() {
    this.statusDialog.openDialog();
  }

  editClickedHandler() {
    this.statusDialog.openDialogById(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }


  deleteAllClickedHandler() {
    this._service.removeAll();
  }


}


