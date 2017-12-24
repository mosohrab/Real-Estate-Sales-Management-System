import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PersonModel } from '../model/person.model';
import { BaseService } from './base.service';
import { BaseKendoGridService } from './base-kendo-grid.service';
import { OperationResultModel } from '../model/operation-result.model';
import { UrlHelper } from '../infrastructure/url-helper';


@Injectable()
export class PersonService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.PERSON_API);
  }



}




@Injectable()
export class PersonKendoGridService extends BaseKendoGridService {
  _personService: PersonService;

  constructor(http: Http, service: PersonService) {
    super(http, UrlHelper.PERSON_API);
  }




}


@Injectable()
export class PersonStatusService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.PERSONSTATUS_API);
  }



}


@Injectable()
export class PersonStatusKendoGridService extends BaseKendoGridService {
  _personStatusService: PersonStatusService;

  constructor(http: Http, service: PersonStatusService) {
    super(http, UrlHelper.PERSONSTATUS_API);
    this._personStatusService = service;
  }



}
