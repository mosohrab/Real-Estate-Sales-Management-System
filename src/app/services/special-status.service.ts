import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ObserveOnSubscriber } from 'rxjs/operators/observeOn';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProvinceModel } from '../model/province.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { SpecialStatusModel } from '../model/special-status.model';
import { OperationResultModel } from '../model/operation-result.model';
import { TreeModel } from '../core/model/tree.model';

@Injectable()
export class SpecialStatusService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.SpecialStatus_API);
  }


  public getAllItems(): Observable<SpecialStatusModel[]> {
    return this.get('/getAllItems');
  }

  // public getTreeRoot(): Observable<TreeModel[]> {
  //   return this.get('/GetTree');
  // }
  public getTree(): Observable<TreeModel[]> {
    return this.get('/GetTree');
  }


  // public fetchCategories(): Observable<any[]> {
  //   return this.get('getAllItems');
  // }

  // public fetchProducts(categoryID: number): any {
  //   return this.get('getAllItems');
  // }



}



@Injectable()
export class SpecialStatusKendoGridService extends WeBaseKendoGridService {
  statusService: SpecialStatusService;

  constructor(http: Http, service: SpecialStatusService) {
    super(http, UrlHelper.SpecialStatus_API);

    this.statusService = service;
  }
}





@Injectable()
export class SpecialStatusComboService extends BehaviorSubject<SpecialStatusModel[]> {

  baseService: SpecialStatusService;
  constructor(http: Http, servise: SpecialStatusService) {
    super(null);
    // this._baseService = new BaseService(http, UrlHelper.SpecialStatus_API + '/');

    this.baseService = servise;
    this.baseService.API_URL += '/';
  }

  public read(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}
