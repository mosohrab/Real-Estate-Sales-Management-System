import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProvinceModel } from '../model/province.model';
import { BaseService } from './base.service';
import { BaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { SpecialStatusValueModel } from '../model/special-status.model';

@Injectable()
export class SpecialStatusValueService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SpecialStatusValue_API);
  }



}



@Injectable()
export class SpecialStatusValueKendoGridService extends BaseKendoGridService {

  constructor(http: Http) {
    super(http, UrlHelper.SpecialStatusValue_API);
  }


}




@Injectable()
export class SpecialStatusValueComboService extends BehaviorSubject<SpecialStatusValueModel[]> {

  baseService: SpecialStatusValueService;
  constructor(http: Http, servise: SpecialStatusValueService) {
    super(null);
    // this._baseService = new BaseService(http, UrlHelper.SpecialStatusValue_API + '/');


    this.baseService = servise;
    this.baseService.API_URL += '/';
  }

  public read(id: number): void {
    this.baseService.get('getItems/' + id)
      .subscribe(x => super.next(x));

  }
  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}
