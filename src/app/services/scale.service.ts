

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ScaleModel } from '../model/base.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';

@Injectable()
export class ScaleService extends WeBaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SCALE_API);

  }


}


@Injectable()
export class ScaleKendoGridService extends BaseKendoGridService {

  constructor(http: Http) {
    super(http, UrlHelper.SCALE_API);

  }
}



@Injectable()
export class ScaleComboService extends BehaviorSubject<ScaleModel[]> {

  baseService: ScaleService;
  constructor(http: Http, service: ScaleService) {
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

