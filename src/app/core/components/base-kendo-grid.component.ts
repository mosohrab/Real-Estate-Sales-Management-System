
import {
    Component, OnInit,
    AfterViewInit,
    ViewChild, ContentChild,
    ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { process, State } from '@progress/kendo-data-query';
import {
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    SelectAllCheckboxState,
    SelectableSettings
} from '@progress/kendo-angular-grid';

import { NotifyManager } from '../utils/notify-manager';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { BaseKendoGridService } from '../services/base-kendo-grid.service';
import { BaseComponent } from './base.component';

// @Component({
// selector: 'app-base-kendo-grid',
// template: `
// <app-delete-confirm [openedConfirmDelete]="openedConfirmDelete"></app-delete-confirm>
// `
// })
export abstract class BaseKendoGridComponent extends BaseComponent {

    protected notify: NotifyManager;
    protected gridDataResult: Observable<GridDataResult>;
    private buttonCount = 5;
    private info = true;
    private type: 'numeric' | 'input' = 'numeric';
    private pageSizes = true;
    private previousNext = true;
    protected state: State = {
        skip: 0,
        take: 10,
        filter: {
            logic: 'and',
            filters: []
        }
    };
    private selectableSettings = <SelectableSettings>{
        enabled: true,
        mode: 'multiple'
    };


    public openedConfirmDelete = true;
    protected editedRowIndex: number;
    protected editedItem: any;
    protected _service: BaseKendoGridService;

    protected dataItemSelected = Array<any>();
    protected selectAllState: SelectAllCheckboxState = 'unchecked';

    // @ContentChild('deleteConfirm') deleteConfirm: ElementRef;
    // @ViewChild(DeleteConfirmComponent) deleteConfirm2: DeleteConfirmComponent;

    constructor(service: BaseKendoGridService) {
        super();
        this._service = service;
        this.gridDataResult =
            this.gridDataResult = service;
        this.notify = NotifyManager.createInstance();


    }

   private onAdd({ sender }) {
        this.onCloseEditor(sender);
        sender.addRow({});
    }

    private onEdit({ sender, rowIndex, dataItem }) {
        this.onCloseEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedItem = Object.assign({}, dataItem);
        // this._service.save(dataItem, false);
        sender.editRow(rowIndex);
    }

    private onCancel({ sender, rowIndex }) {
        this.onCloseEditor(sender, rowIndex);
    }

    private onCloseEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        // this._service.resetItem(this.editedItem);
        this.editedRowIndex = undefined;
        this.editedItem = undefined;
    }

    private onSave({ sender, rowIndex, dataItem, isNew }) {
        this._service.save(dataItem, isNew);
        sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedItem = undefined;
    }

    private onRemove(id) {
        const that = this;
        this._service.notify.showDeleteConfirm(() => {
            that._service.remove(id);
        });
    }


    private onDataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this._service.state = state;
        this._service.readGrid();
    }
    private onSelectedKeysChange(e) {

        const len = this.dataItemSelected.length;

        if (len === 0) {
            this.selectAllState = 'unchecked';
        } else if (len > 0 && len < this.dataItemSelected.length) {
            this.selectAllState = 'indeterminate';
        } else {
            this.selectAllState = 'checked';
        }
    }

    private onSelectAllChange(checkedState: SelectAllCheckboxState) {

        if (checkedState === 'checked') {

            // this.dataItemSelection = this.items.map((item) => {
            //     return item.ProductID; });
            this.selectAllState = 'checked';
        } else {
            this.dataItemSelected = [];
            this.selectAllState = 'unchecked';
        }
    }

    private onPageChange(event: PageChangeEvent): void {
        this.state.skip = event.skip;
        this._service.readGrid();
    }





    protected addClickedHandler() { }
    private onAddClicked() {
        this.addClickedHandler();
    }

    protected editClickedHandler() { }
    private onEditClicked() {
        if (this.dataItemSelected.length < 1) {
            this.notify.showError('هیچ رکوردی انتخاب نشده');
            return;
        }
        if (this.dataItemSelected.length > 1) {
            this.notify.showError('امکان ویرایش چندین رکورد وجود ندارد. ');
            return;
        }
        this.editClickedHandler();
    }

    protected deleteClickedHandler() { }
    private onDeleteClicked() {
        if (this.dataItemSelected.length < 1) {
            this._service.notify.showWarning('هیچ رکوردی انتخاب نشده');
            return;
        }

        const that = this;
        this._service.notify.showDeleteConfirm(() => {
            that.deleteClickedHandler();

        });

    }
    protected deleteAllClickedHandler() { }
    private onDeleteAllClicked() {
        const that = this;
        this._service.notify.showDeleteConfirm(() => {
            that.deleteAllClickedHandler();

        }, 'آیا از حذف تمامی رکوردهای جدول اطمینان دارید؟');

    }


}
