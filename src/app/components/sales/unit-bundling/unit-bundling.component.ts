import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';


@Component({
  selector: 'app-unit-bundling',
  templateUrl: './unit-bundling.component.html',
  styleUrls: ['./unit-bundling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnitBundlingComponent extends WeBaseComponent {


  constructor() {
    super();
  }

  ngOnInitHandler() {
  }



  onSaveStatus() {

  }
}
