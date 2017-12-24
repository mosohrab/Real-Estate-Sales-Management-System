import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UnitModel,UnitFeatureAssignedModel } from '../model/unit.model';
import { BaseService } from './base.service';
import { BaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';

@Injectable()
export class UnitService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.UNIT_API);
    }
}

@Injectable()
export class UnitKendoGridService extends BaseKendoGridService {
    usageService: UnitService;

    constructor(http: Http, service: UnitService) {
        super(http, UrlHelper.UNIT_API);
        this.usageService = service;
    }

}

@Injectable()
export class UnitComboService extends BehaviorSubject<UnitModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UnitService) {
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


// ======================================================



@Injectable()
export class UnitFeatureAssignedService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.UNITFEATUREASSIGNED_API);
    }
}

@Injectable()
export class UnitFeatureAssignedKendoGridService extends BaseKendoGridService {
    usageService: UnitFeatureAssignedService;

    constructor(http: Http, service: UnitFeatureAssignedService) {
        super(http, UrlHelper.UNITFEATUREASSIGNED_API);
        this.usageService = service;
    }

}

@Injectable()
export class UnitFeatureAssignedComboService extends BehaviorSubject<UnitFeatureAssignedModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UnitFeatureAssignedService) {
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


