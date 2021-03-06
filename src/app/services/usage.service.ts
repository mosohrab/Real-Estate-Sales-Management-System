import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UsageModel, UsageItemModel } from '../model/usage.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { TreeModel } from '../core/model/tree.model';



@Injectable()
export class UsageService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.USAGE_API);
    }

    public getTree(): Observable<TreeModel[]> {
        return this.get('/GetTree');
      }

      
}

@Injectable()
export class UsageKendoGridService extends WeBaseKendoGridService {
    usageService: UsageService;

    constructor(http: Http, service: UsageService) {
        super(http, UrlHelper.USAGE_API);
        this.usageService = service;
    }

}

@Injectable()
export class UsageComboService extends BehaviorSubject<UsageModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UsageService) {
        super(null);
        //   this.baseService = new BaseService(http, UrlHelper.USAGE_API + '/');
        this.baseService = servise;
        this.baseService.API_URL += '/';
    }

    public readAll(): void {
        this.baseService.get('getallitems')
            .subscribe(x => super.next(x));

    }

}


// ============================================================
// ==========================================================


@Injectable()
export class UsageItemService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.USAGEITEM_API);
    }

    public getTree(code: string): Observable<TreeModel[]> {
        return this.get('/GetTree/' + code);
      }
    

}

@Injectable()
export class UsageItemKendoGridService extends WeBaseKendoGridService {
    usageItemService: UsageItemService;

    constructor(http: Http, service: UsageItemService) {
        super(http, UrlHelper.USAGEITEM_API);

        this.usageItemService = service;
    }

}

@Injectable()
export class UsageItemComboService extends BehaviorSubject<UsageItemModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UsageItemService) {
        super(null);
        //  this.baseService = new BaseService(http, UrlHelper.USAGEITEM_API + '/');
        this.baseService = servise;
        this.baseService.API_URL += '/';
    }

    public readAll(): void {
        this.baseService.get('getallitems')
            .subscribe(x => super.next(x));

    }

    public read(usageId: number): void {
        this.baseService.get('getItems/' + usageId)
            .subscribe(x => super.next(x));

    }

}



