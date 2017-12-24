import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UnitFeatureTitleModel } from '../../../model/unit-feature.model';
import { UnitFeatureTitleService, UnitFeatureTitleComboService } from '../../../services/unit-feature.service';
import { BaseComponent, BaseComboComponent } from '../../shared/base.component';

@Component({
  selector: 'app-feature-title-combo-single',
  templateUrl: './feature-title-combo-single.component.html',
  styleUrls: ['./feature-title-combo-single.component.scss'],
  providers: [
    UnitFeatureTitleService,
    UnitFeatureTitleComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeatureTitleComboSingleComponent),
      multi: true
    }
  ]
})
export class FeatureTitleComboSingleComponent extends BaseComboComponent {

  service: UnitFeatureTitleComboService;
  model = <UnitFeatureTitleModel>{};
  private view: Observable<UnitFeatureTitleModel[]>;

  constructor(service: UnitFeatureTitleComboService) {
    super();
    this.view = service;
    this.service = service;
  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }


  public setFeatureId(id: number): void {
    this.clear();
    this.service.read(id);
  }



}
