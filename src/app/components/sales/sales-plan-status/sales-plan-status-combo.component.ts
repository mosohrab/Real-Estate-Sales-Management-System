import {
  Component, OnInit, Input, Output,
  EventEmitter, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SalesPlanStatusModel } from '../../../model/sales.model';
import { SalesPlanStatusService, SalesPlanStatusComboService } from '../../../services/sales.service';
import { BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-sales-plan-status-combo',
  templateUrl: './sales-plan-status-combo.component.html',
  styleUrls: ['./sales-plan-status-combo.component.scss'],
  providers: [
    SalesPlanStatusService,
    SalesPlanStatusComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SalesPlanStatusComboComponent),
      multi: true,
    }
  ]
})
export class SalesPlanStatusComboComponent extends BaseComboComponent {

  service: SalesPlanStatusComboService;
  private view: Observable<SalesPlanStatusModel[]>;

  constructor(service: SalesPlanStatusComboService) {
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


