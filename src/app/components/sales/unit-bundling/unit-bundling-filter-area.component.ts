import {
  Component, OnInit, ViewChild,
  ViewEncapsulation, Input, Output,
  EventEmitter
} from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { UnitRangeService, UnitRangeKendoGridService } from '../../../services/sales.service';
import { UnitRangeFilterModel, UnitBundlingFilterAreaModel } from '../../../model/sales.model'


@Component({
  selector: 'app-unit-bundling-filter-area',
  templateUrl: './unit-bundling-filter-area.component.html',
  styleUrls: ['./unit-bundling-filter-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitRangeService,
    UnitRangeKendoGridService
  ]
})
export class UnitBundlingFilterAreaComponent extends WeBaseKendoGridComponent {

  @Input() model: UnitBundlingFilterAreaModel[];

  constructor(service: UnitRangeKendoGridService) {
    super(service);


  }

  ngOnInitHandler() {

  }

  addItem() {
    this.model.push(<UnitBundlingFilterAreaModel>{

    })
  }


  removeItem(index) {
    this.model.splice(index, 1);
  }



}


