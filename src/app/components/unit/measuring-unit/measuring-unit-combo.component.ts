import {
  Component, OnInit, Input,
  Output, EventEmitter, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MeasuringUnitModel } from '../../../model/unit.model';
import { MeasuringUnitService, MeasuringUnitComboService } from '../../../services/measuring-unit.service';
import { BaseComboComponent } from 'ng2-aryanet-core';

@Component({
  selector: 'app-measuring-unit-combo',
  templateUrl: './measuring-unit-combo.component.html',
  styleUrls: ['./measuring-unit-combo.component.scss'],
  providers: [
    MeasuringUnitService,
    MeasuringUnitComboService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MeasuringUnitComboComponent),
      multi: true,
    }
  ]
})
export class MeasuringUnitComboComponent extends BaseComboComponent {

  service: MeasuringUnitComboService;
  private view: Observable<MeasuringUnitModel[]>;

  constructor(service: MeasuringUnitComboService) {
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
