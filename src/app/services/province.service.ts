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

@Injectable()
export class ProvinceService extends BaseService {

  constructor(http: Http) {
    super(http, UrlHelper.PROVINCE_API);
  }

}

@Injectable()
export class ProvinceKendoGridService extends BaseKendoGridService {

  constructor(http: Http) {
    super(http, UrlHelper.PROVINCE_API);
  }


}


@Injectable()
export class ProvinceComboService extends BehaviorSubject<ProvinceModel[]> {
  baseService: ProvinceService;

  // _baseService: BaseService;
  constructor(http: Http, provinceService: ProvinceService) {
    super(null);
    //  this._baseService = new BaseService(http, UrlHelper.PROVINCE_API + '/');
    this.baseService = provinceService;
    this.baseService.API_URL += '/';

  }

  public read(countyId: number): void {
    this.baseService.get('getItems/' + countyId)
      .subscribe(x => super.next(x));

  }
  public readAll(): void {
    this.baseService.get('getAllItems')
      .subscribe(x => super.next(x));

  }

}


// @Injectable()
// export class ProvinceComboSingleService extends BehaviorSubject<ProvinceModel[]> {

//  _baseService: BaseService;
//     constructor(http: Http ) {
//     super(null);
//     this._baseService = new BaseService(http, UrlHelper.PROVINCE_API + '/');
//    }

//    public read(): void {
//       this._baseService.get('getAllItems' )
//               .subscribe(x => super.next(x));

//    }

// }
