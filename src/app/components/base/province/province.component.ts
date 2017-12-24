import {
  Component, OnInit,
  ViewChild
} from '@angular/core';



import { ProvinceModel } from '../../../model/province.model';
import { CountryModel } from '../../../model/country.model';

import { BaseKendoGridService } from '../../../services/base-kendo-grid.service';
import { ProvinceService, ProvinceKendoGridService } from '../../../services/province.service';

import { CountryComboComponent } from '../../shared/country-combo/country-combo.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { ProvinceUpsertComponent } from './province-upsert.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  providers: [ProvinceKendoGridService]
})
export class ProvinceComponent extends BaseKendoGridComponent {

  @ViewChild('dialogUpsert') dialogUpsert: ProvinceUpsertComponent;

  constructor(service: ProvinceKendoGridService) {
    super(service);

    // this._countryService = service;
    // this.gridDataResult = service;
    // this._countryService.readGrid();
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this.refresh();
    // .sub;


  }

  private refresh(): void {
    this._service.readGrid();
    // this._countryService.getCountries().subscribe((c: CountryModel[]) => {
    // this._countryService.fetch(this.state).subscribe((c: CountryModel[]) => {
    //   this.countries = c;
    //   this.loadItems();
    // });

  }




  addClickedHandler() {
    this.dialogUpsert.openDialog();
  }

  editClickedHandler() {
    this.dialogUpsert.openDialogById(this.dataItemSelected[0]);
  }

  deleteClickedHandler() {
    const id = this.dataItemSelected[0];
    this._service.removeArrange(this.dataItemSelected);
  }

  deleteAllClickedHandler() {
    this._service.removeAll();
  }



}
