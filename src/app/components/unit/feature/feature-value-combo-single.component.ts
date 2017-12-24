import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsageItemModel } from '../../../model/usage.model';
import { UnitFeatureValueService, UnitFeatureValueComboService } from '../../../services/unit-feature.service';
import { BaseComponent, BaseComboComponent } from '../../shared/base.component';
import { UnitFeatureValueModel } from '../../../model/unit-feature.model';

@Component({
  selector: 'app-feature-value-combo-single',
  templateUrl: './feature-value-combo-single.component.html',
  styleUrls: ['./feature-value-combo-single.component.scss'],
  providers: [
    UnitFeatureValueService,
    UnitFeatureValueComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeatureValueComboSingleComponent),
      multi: true
    }
  ]
})
export class FeatureValueComboSingleComponent extends BaseComboComponent {

  service: UnitFeatureValueComboService;
  model = <UnitFeatureValueModel>{};
  private view: Observable<UnitFeatureValueModel[]>;

  constructor(service: UnitFeatureValueComboService) {
    super();
    this.view = service;
    this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }


  public setFeatureTitle(id: number): void {
    this.clear();
    this.service.read(id);
  }



}
