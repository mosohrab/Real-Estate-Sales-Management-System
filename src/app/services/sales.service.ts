import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesPlanModel, SalesPlanStatusModel,PersonExceptionModel } from '../model/sales.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { OperationResultModel } from '../model/operation-result.model';
import { UrlHelper } from '../infrastructure/url-helper';


@Injectable()
export class SalesPlanService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SalesPlan_API);
  }
}


@Injectable()
export class SalesPlanKendoGridService extends WeBaseKendoGridService {
  _cityService: SalesPlanService;

  constructor(http: Http, cityService: SalesPlanService) {
    super(http, UrlHelper.SalesPlan_API);
    this._cityService = cityService;
  }
}


@Injectable()
export class SalesPlanComboService extends BehaviorSubject<SalesPlanModel[]> {

  baseService: SalesPlanService;
  constructor(http: Http, service: SalesPlanService) {
    super(null);
    //  this._baseService = new BaseService(http, UrlHelper.CITY_API + '/');
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  // public read(provinceId: number): void {
  //   this.baseService.get('getItems/' + provinceId)
  //     .subscribe(x => super.next(x));

  // }

  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}

//
//
@Injectable()
export class SalesPlanStatusService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SalesPlanStatus_API);
  }
}


@Injectable()
export class SalesPlanStatusKendoGridService extends WeBaseKendoGridService {
  _cityService: SalesPlanStatusService;

  constructor(http: Http, cityService: SalesPlanStatusService) {
    super(http, UrlHelper.SalesPlanStatus_API);
    this._cityService = cityService;
  }
}


@Injectable()
export class SalesPlanStatusComboService extends BehaviorSubject<SalesPlanModel[]> {

  baseService: SalesPlanStatusService;
  constructor(http: Http, service: SalesPlanStatusService) {
    super(null);
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  // public read(provinceId: number): void {
  //   this.baseService.get('getItems/' + provinceId)
  //     .subscribe(x => super.next(x));

  // }

  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}


//
//

@Injectable()
export class PersonExceptionService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.PersonException_API);
  }
}


@Injectable()
export class PersonExceptionKendoGridService extends WeBaseKendoGridService {
  _cityService: SalesPlanStatusService;

  constructor(http: Http, cityService: PersonExceptionService) {
    super(http, UrlHelper.PersonException_API);
    this._cityService = cityService;
  }
}


@Injectable()
export class PersonExceptionComboService extends BehaviorSubject<PersonExceptionModel[]> {

  baseService: PersonExceptionService;
  constructor(http: Http, service: PersonExceptionService) {
    super(null);
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  // public read(provinceId: number): void {
  //   this.baseService.get('getItems/' + provinceId)
  //     .subscribe(x => super.next(x));
  // }

  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}


