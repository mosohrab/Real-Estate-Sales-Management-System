import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MeasuringUnitModel } from '../model/unit.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';

@Injectable()
export class MeasuringUnitService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.MeasuringUnit_API);
    }
}

@Injectable()
export class MeasuringUnitKendoGridService extends WeBaseKendoGridService {
    usageService: MeasuringUnitService;

    constructor(http: Http, service: MeasuringUnitService) {
        super(http, UrlHelper.MeasuringUnit_API);
        this.usageService = service;
    }

}

@Injectable()
export class MeasuringUnitComboService extends BehaviorSubject<MeasuringUnitModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: MeasuringUnitService) {
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

