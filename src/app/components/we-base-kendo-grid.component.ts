
import {
    Component, OnInit,
    AfterViewInit,
    ViewChild, ContentChild,
    ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {
    process, State, filterBy,
    FilterDescriptor, CompositeFilterDescriptor
} from '@progress/kendo-data-query';
import {
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    SelectAllCheckboxState,
    SelectableSettings,

} from '@progress/kendo-angular-grid';

//import { NotifyManager } from '../infrastructure/notify-manager';
import { NotifyManager } from '../core/utils/notify-manager';
import { WeBaseKendoGridService } from '../services/base-kendo-grid.service';
import { WeBaseComponent } from './we-base.component';
// @Component({
// selector: 'app-base-kendo-grid',
// template: `
// <app-delete-confirm [openedConfirmDelete]="openedConfirmDelete"></app-delete-confirm>
// `
// })
export abstract class WeBaseKendoGridComponent extends WeBaseComponent {
    // implements OnInit, AfterViewInit {

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
    protected _service: WeBaseKendoGridService;

    protected dataItemSelected = Array<any>();
    protected selectAllState: SelectAllCheckboxState = 'unchecked';

    // @ContentChild('deleteConfirm') deleteConfirm: ElementRef;
    // @ViewChild(DeleteConfirmComponent) deleteConfirm2: DeleteConfirmComponent;

    constructor(service: WeBaseKendoGridService) {
        super();
        this._service = service;
        this.gridDataResult = this.gridDataResult = service;

        this.notify = this._service._baseService.notify;
        //  this.notify = NotifyManager.createInstance();


    }


    // protected abstract ngOnInitHandler();
    // ngOnInit() {
    //     this.ngOnInitHandler();

    //     //  this.deleteConfirm.openedConfirmDelete = true;
    //     // this.deleteConfirm.open();

    // }

    // protected ngAfterViewInitHandler() { }
    // ngAfterViewInit() {
    //     this.ngAfterViewInitHandler();
    // }


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
        this._service._baseService.notify.showDeleteConfirm(() => {
            that._service.remove(id);
        });
    }


    public setDataState(state) {
        this.state = state;
        this._service.state = state;
    }


    private onDataStateChange(state: DataStateChangeEvent): void {
        this.setDataState(state);
        this._service.readGrid();
    }

    private filterChange(filter: CompositeFilterDescriptor): void {

        // this.filter = filter;
        // this.gridData = filterBy(sampleProducts, filter);
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
            this._service._baseService.notify.showError('هیچ رکوردی انتخاب نشده');
            return;
        }
        if (this.dataItemSelected.length > 1) {
            this._service._baseService.notify.showError('امکان ویرایش چندین رکورد وجود ندارد. ');
            return;
        }
        this.editClickedHandler();
    }

    protected deleteClickedHandler() { }
    private onDeleteClicked() {
        if (this.dataItemSelected.length < 1) {
            this._service._baseService.notify.showWarning('هیچ رکوردی انتخاب نشده');
            return;
        }

        const that = this;
        this._service._baseService.notify.showDeleteConfirm(() => {
            that.deleteClickedHandler();

        });

    }
    protected deleteAllClickedHandler() { }
    private onDeleteAllClicked() {
        const that = this;
        this._service._baseService.notify.showDeleteConfirm(() => {
            that.deleteAllClickedHandler();

        }, 'آیا از حذف تمامی رکوردهای جدول اطمینان دارید؟');

    }


}
