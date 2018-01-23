
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CountryModel } from '../model/country.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';

@Injectable()
export class CountryService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.COUTRY_API);

  }


}


@Injectable()
export class CountryKendoGridService extends WeBaseKendoGridService {

  constructor(http: Http) {
    super(http, UrlHelper.COUTRY_API);

  }
}



@Injectable()
export class CountryComboService extends BehaviorSubject<CountryModel[]> {

  baseService: CountryService;
  constructor(http: Http, service: CountryService) {
    super(null);
    // this._baseService = new BaseService(http, UrlHelper.COUTRY_API + '/');
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  public read(): void {
    this.baseService.get('getItems')
      .subscribe(x => super.next(x));

  }

}
