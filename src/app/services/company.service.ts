import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseService } from './base.service';
import { BaseKendoGridService } from './base-kendo-grid.service';
import { OperationResultModel } from '../model/operation-result.model';
import { UrlHelper } from '../infrastructure/url-helper';


@Injectable()
export class CompanyService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.COMPANY_API);
  }



}


@Injectable()
export class CompanyKendoGridService extends BaseKendoGridService {
  _companyService: CompanyService;

  constructor(http: Http, service: CompanyService) {
    super(http, UrlHelper.COMPANY_API);
    this._companyService = service;
  }



}

@Injectable()
export class CompanyStatusService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.COMPANYSTATUS_API);
  }



}


@Injectable()
export class CompanyStatusKendoGridService extends BaseKendoGridService {
  _companyStatusService: CompanyStatusService;

  constructor(http: Http, service: CompanyStatusService) {
    super(http, UrlHelper.COMPANYSTATUS_API);
    this._companyStatusService = service;
  }



}

