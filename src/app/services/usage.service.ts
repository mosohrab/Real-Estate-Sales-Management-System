import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UsageModel, UsageItemModel } from '../model/usage.model';
import { BaseService } from './base.service';
import { BaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';

@Injectable()
export class UsageService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.USAGE_API);
    }
}

@Injectable()
export class UsageKendoGridService extends BaseKendoGridService {
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

}

@Injectable()
export class UsageItemKendoGridService extends BaseKendoGridService {
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



