import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { WeBaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { PersonBundlingService, PersonBundlingKendoGridService } from '../../../services/sales.service';

@Component({
  selector: 'app-person-result',
  templateUrl: './person-result.component.html',
  styleUrls: ['./person-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    PersonBundlingService,
    PersonBundlingKendoGridService
  ]
})
export class PersonResultComponent extends WeBaseKendoGridComponent {

  constructor(service: PersonBundlingKendoGridService) {
    super(service);
  }

  ngOnInitHandler() {

    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
  }

  private refresh(): void {
    const that = this;
    this._service.readGrid();
  }





}


