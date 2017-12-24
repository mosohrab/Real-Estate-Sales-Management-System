
import {
    Component, OnInit, Input, Output,
    EventEmitter, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {  BaseControlValueAccessor } from './base.component';

@Component({
    selector: 'app-combo-control',
    template: `
<kendo-dropdownlist 
[data]="view | async"
[value]="selectedId"
[valuePrimitive]="true" 
[textField]="'featureName'"
[valueField]="'unitFeatureId'"
[(ngModel)]="selectedId"
[filterable]="true"
(valueChange)="onValueChange($event)"
(selectionChange)="onSelectionChange($event)"
(filterChange)="onFilterChange($event)" 
 style="width: 100%;"

>
 </kendo-dropdownlist>
    `,
    styles: [`
    `],
    providers: [
        // FeatureComboComponent,
        // {
        //     provide: NG_VALUE_ACCESSOR,
        //     useExisting: forwardRef(() => FeatureComboComponent),
        //     multi: true,
        // }
    ]
    // inputs: ['defaultValue']
})
export class ComboControlComponent extends BaseControlValueAccessor {

   // _service: UnitFeatureComboService;

    @Input() selectedId: number;
    @Output() valueChanged = new EventEmitter<number>();

  //  private view: Observable<UnitFeatureModel[]>;
    constructor(
      //  service: UnitFeatureComboService
    ) {
        super();

       // this._service = service;
      //  this.view = service;
      //  this._service.read();
    }

    ngOnInitHandler() {

    }


    public onValueChange(value: any): void {
        this.propagateChange(value);
        this.valueChanged.emit(value);
    }

    public onSelectionChange(value: any): void {
        //  this.log("selectionChange", value);
    }

    public onFilterChange(filter: any): void {
        // this.log("filterChange", filter);
        // this.data = this.source.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }



    writeValue(obj: any): void {
        if (obj) {
            this.selectedId = obj;
        }
    }


}




