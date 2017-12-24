import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsageItemModel } from '../../../model/usage.model';
import { UsageService, UsageItemService, UsageItemComboService } from '../../../services/usage.service';
import { BaseComponent, BaseComboComponent } from '../../shared/base.component';

@Component({
  selector: 'app-usage-item-combo-single',
  templateUrl: './usage-item-combo-single.component.html',
  styleUrls: ['./usage-item-combo-single.component.scss'],
  providers: [
    UsageService,
    UsageItemService,
    UsageItemComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsageItemComboSingleComponent),
      multi: true
    }
  ]
})
export class UsageItemComboSingleComponent extends BaseComboComponent
// <UsageItemModel, UsageItemService> 
{

  service: UsageItemComboService;
  model = <UsageItemModel>{};
  private view: Observable<UsageItemModel[]>;

  constructor(service: UsageItemComboService) {
    super();
    this.view = service;
    this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }


  public setUsageId(id: number): void {
    this.clear();
    this.service.read(id);
  }



}
