
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { BuildingstructuretypeModel } from '../model/base.model';


@Injectable()
export class BuildingstructuretypeService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.BUILDINGSTRUCTURETYPE_API);
    }


}

@Injectable()
export class BuildingstructuretypeKendoGridService extends WeBaseKendoGridService {
    baseService: BuildingstructuretypeService;

    constructor(http: Http, service: BuildingstructuretypeService) {
        super(http, UrlHelper.BUILDINGSTRUCTURETYPE_API);
        this.baseService = service;
    }

}



@Injectable()
export class BuildingstructuretypeComboService extends BehaviorSubject<BuildingstructuretypeModel[]> {

  baseService: BuildingstructuretypeService;
  constructor(http: Http, service: BuildingstructuretypeService) {
    super(null);
    this.baseService = service;
    this.baseService.API_URL += '/';
  }

  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}
