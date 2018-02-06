import {
  Component, OnInit,
  Input, Output, EventEmitter,
  AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseService } from '../services/base.service';
import { BreadcrumbModel } from '../model/breadcrumb.model';

export abstract class BaseComponent implements OnInit, AfterViewInit, OnChanges {

  datePickerConfig = {
    drops: 'up', // down
    format: 'jYYYY/jMM/jDD',
    //  format: 'LL', // 15 آبان 1396
    // format: 'YYYY/MM/DD',
    locale: 'fa',
    calendarSystem: 0,

    // hours12Format?: string;
    // hours24Format?: string;
    // maxTime?: Moment;
    // meridiemFormat?: string;
    // minTime?: Moment;
    // minutesFormat?: string;
    // minutesInterval?: number;
    // secondsFormat?: string;
    // secondsInterval?: number;
    // showSeconds?: boolean;
    // showTwentyFourHours?: boolean;
    // timeSeparator?: string;
    // calendarSystem?: ECalendarSystem;
    // isMonthDisabledCallback?: (date: Moment) => boolean;
    // allowMultiSelect?: boolean;
    // yearFormat?: string;
    // calendarSystem?: ECalendarSystem;
    // yearFormatter?: (month: Moment) => string;
    // format?: string;
    // isNavHeaderBtnClickable?: boolean;
    // monthBtnFormat?: string;
    // monthBtnFormatter?: (day: Moment) => string;
    // multipleYearsNavigateBy?: number;
    // showMultipleYearsNavigation?: boolean;
    // isDayDisabledCallback?: (date: Moment) => boolean;
    // isMonthDisabledCallback?: (date: Moment) => boolean;
    // weekDayFormat?: string;
    // showNearMonthDays?: boolean;
    // showWeekNumbers?: boolean;
    // firstDayOfWeek?: WeekDays;
    // calendarSystem?: ECalendarSystem;
    // format?: string;
    // allowMultiSelect?: boolean;
    // monthFormat?: string;
    // monthFormatter?: (month: Moment) => string;
    // enableMonthSelector?: boolean;
    // yearFormat?: string;
    // yearFormatter?: (year: Moment) => string;
    // dayBtnFormat?: string;
    // dayBtnFormatter?: (day: Moment) => string;
    // monthBtnFormat?: string;
    // monthBtnFormatter?: (day: Moment) => string;
    // multipleYearsNavigateBy?: number;
    // showMultipleYearsNavigation?: boolean;
    // closeOnSelect?: boolean;
    // closeOnSelectDelay?: number;
    // onOpenDelay?: number;
    // disableKeypress?: boolean;
    // appendTo?: string | HTMLElement;
    // inputElementContainer?: HTMLElement;
    // showGoToCurrent?: boolean;
    // drops?: TDrops;
    // opens?: TOpens;
    // hideInputContainer?: boolean;
  };


  ngOnInitHandler() { }
  ngOnInit() {
    this.ngOnInitHandler();
  }

  ngAfterViewInitHandler() { }
  ngAfterViewInit(): void {
    this.ngAfterViewInitHandler();
  }

  ngOnChangesHandler(changes: SimpleChanges) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChangesHandler(changes);
  }


}


export abstract class BaseTreeComponent extends BaseComponent {

  treeSettings = {
    rootIsVisible: true
  };


  abstract ngOnInitHandler();

}



export abstract class BaseControlValueAccessor implements ControlValueAccessor, OnInit {

  ngOnInitHandler() { }
  ngOnInit() {
    this.ngOnInitHandler();
  }


  abstract writeValue(obj: any): void;
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  propagateChange = (_: any) => { };


}



export abstract class BaseComboComponent
  // <TModel, TService extends BaseService>
  extends BaseControlValueAccessor {

  @Input() selectedId: any;
  // @Input() selectedText: string;
  @Output() valueChanged = new EventEmitter<any[]>();
  @Input() autoBound = true;
  // selectedItem: any;
  service: any;

  constructor() {
    super();

  }

  abstract ngOnInitHandler();

  public clear(): void {
    this.selectedId = null;

  }



  // public setDataValue(id: number): void {
  //   // this.clear();
  //   // const that = this;
  //   // this.service.baseService.find(id)
  //   //   .subscribe((res) => {
  //   //     that.service.baseService.operationHandling(res, (r) => {
  //   //       that.selectedItem = res;
  //   //     });
  //   //   });
  // }


  // public setData(item: any): void {
  //   this.clear();
  //   this.selectedItem = item;
  // }

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

  public onOpen(): void {
    //   this.log("open");
  }

  public onClose(): void {
    //  this.log("close");
  }

  public onFocus(): void {
    //   this.log("focus");
  }

  public onBlur(): void {
    //  this.log("blur");
  }



  writeValue(obj: any): void {
    if (obj) {
      this.selectedId = obj;
    }
  }


}
