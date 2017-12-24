import {
  Component, OnInit, Input,
  Output, EventEmitter, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsageModel } from '../../../model/usage.model';
import { UsageService, UsageComboService } from '../../../services/usage.service';
import { BaseComponent, BaseComboComponent } from '../../shared/base.component';

@Component({
  selector: 'app-usage-combo',
  templateUrl: './usage-combo.component.html',
  styleUrls: ['./usage-combo.component.scss'],
  providers: [
    UsageService,
    UsageComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsageComboComponent),
      multi: true,
    }
  ]
})
export class UsageComboComponent extends BaseComboComponent {

  service: UsageComboService;
  private view: Observable<UsageModel[]>;

  constructor(service: UsageComboService) {
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
