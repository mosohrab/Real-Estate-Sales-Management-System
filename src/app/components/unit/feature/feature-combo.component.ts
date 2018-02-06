import {
  Component, OnInit, Input, Output,
  EventEmitter, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UnitFeatureModel } from '../../../model/unit-feature.model';
import { UnitFeatureService, UnitFeatureComboService } from '../../../services/unit-feature.service';
import {  BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-feature-combo',
  templateUrl: './feature-combo.component.html',
  styleUrls: ['./feature-combo.component.scss'],
  providers: [
    FeatureComboComponent,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeatureComboComponent),
      multi: true,
    }
  ]
})
export class FeatureComboComponent extends BaseComboComponent {

  service: UnitFeatureComboService;
  private view: Observable<UnitFeatureModel[]>;

  constructor(service: UnitFeatureComboService) {
    super();
    this.service = service;
    this.view = service;

  }

  ngOnInitHandler() {
    if (this.autoBound) {
      this.service.readAll();
    }
  }

}
