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

import { CompanyTypeModel } from '../model/company.model';

@Injectable()
export class CompanyTypeService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.COMPANYTYPE_API);
  }

}


@Injectable()
export class CompanyTypeKendoGridService extends BaseKendoGridService {
  _companyService: CompanyTypeService;

  constructor(http: Http, service: CompanyTypeService) {
    super(http, UrlHelper.COMPANYTYPE_API);
    this._companyService = service;
  }
}






@Injectable()
export class CompanyTypeComboService extends BehaviorSubject<CompanyTypeModel[]> {

  baseService: CompanyTypeService;
  constructor(http: Http, service: CompanyTypeService) {
    super(null);
    //  this._baseService = new BaseService(http, UrlHelper.COMPANYTYPE_API + '/');
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}

