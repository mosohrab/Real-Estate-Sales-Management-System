import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { SpecialStatusValueModel } from '../model/special-status.model';
import { TreeModel } from 'ng2-aryanet-core';

@Injectable()
export class SpecialStatusValueService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SpecialStatusValue_API);
  }


  public getAllItems(): Observable<SpecialStatusValueModel[]> {
    return this.get('/getAllItems');
  }

  public getItemsByStatusId(id: number): Observable<SpecialStatusValueModel[]> {
    return this.get('/getItems/' + id);
  }

  public getTree(id: number): Observable<TreeModel[]> {
    return this.get('/GetTree/' + id);
  }


}



@Injectable()
export class SpecialStatusValueKendoGridService extends WeBaseKendoGridService {

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
