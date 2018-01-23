import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CityModel } from '../model/city.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { OperationResultModel } from '../model/operation-result.model';
import { UrlHelper } from '../infrastructure/url-helper';


@Injectable()
export class CityService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.CITY_API);
  }



}




@Injectable()
export class CityKendoGridService extends WeBaseKendoGridService {
  _cityService: CityService;

  constructor(http: Http, cityService: CityService) {
    super(http, UrlHelper.CITY_API);
    this._cityService = cityService;
  }



}



@Injectable()
export class CityComboService extends BehaviorSubject<CityModel[]> {

  baseService: CityService;
  constructor(http: Http, service: CityService) {
    super(null);
    //  this._baseService = new BaseService(http, UrlHelper.CITY_API + '/');
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  public read(provinceId: number): void {
    this.baseService.get('getItems/' + provinceId)
      .subscribe(x => super.next(x));

  }



  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}
