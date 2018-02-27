import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UnitFeatureModel, UnitFeatureTitleModel, UnitFeatureValueModel } from '../model/unit-feature.model';
import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { TreeModel } from '../ng2-tree/src/tree.types';

@Injectable()
export class UnitFeatureService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.UNITFEATURE_API);
    }


    public getTreeItems(id: string): Observable<TreeModel[]> {
        return this.get('/gettreeitems/' + id)
            .map(res => {
                const r = Array<TreeModel>();
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    r.push(<TreeModel>{
                        id: item.id,
                        value: item.value,
                        children: Array<TreeModel>(),
                        emitLoadNextLevel: item.hasChildren

                    });
                }
                return r;

            });
        // .subscribe(res => {
        //     return res;
        // });


    }


}

@Injectable()
export class UnitFeatureKendoGridService extends WeBaseKendoGridService {
    featureService: UnitFeatureService;

    constructor(http: Http, service: UnitFeatureService) {
        super(http, UrlHelper.UNITFEATURE_API);

        this.featureService = service;
    }

}

@Injectable()
export class UnitFeatureComboService extends BehaviorSubject<UnitFeatureModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UnitFeatureService) {
        super(null);
        // this._baseService = new BaseService(http, UrlHelper.UNITFEATURE_API + '/');

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
export class UnitFeatureTitleService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.UNITFEATURETITLE_API);
    }

    public getTree(id: number): Observable<TreeModel[]> {
        return this.get('/GetTree/' + id);
      }
    

}

@Injectable()
export class UnitFeatureTitleKendoGridService extends WeBaseKendoGridService {
    statusService: UnitFeatureTitleService;

    constructor(http: Http, service: UnitFeatureTitleService) {
        super(http, UrlHelper.UNITFEATURETITLE_API);

        this.statusService = service;
    }

 

}

@Injectable()
export class UnitFeatureTitleComboService extends BehaviorSubject<UnitFeatureTitleModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UnitFeatureTitleService) {
        super(null);
        //  this.baseService = new BaseService(http, UrlHelper.UNITFEATURETITLE_API + '/');

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





// ============================================================
// ==========================================================


@Injectable()
export class UnitFeatureValueService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.UNITFEATUREVALUE_API);
    }


    public getTree(id: number): Observable<TreeModel[]> {
        return this.get('/GetTree/' + id);
      }
}

@Injectable()
export class UnitFeatureValueKendoGridService extends WeBaseKendoGridService {
    statusService: UnitFeatureValueService;

    constructor(http: Http, service: UnitFeatureValueService) {
        super(http, UrlHelper.UNITFEATUREVALUE_API);

        this.statusService = service;
    }

}

@Injectable()
export class UnitFeatureValueComboService extends BehaviorSubject<UnitFeatureValueModel[]> {

    baseService: BaseService;
    constructor(http: Http, servise: UnitFeatureValueService) {
        super(null);
        //    this.baseService = new BaseService(http, UrlHelper.UNITFEATUREVALUE_API + '/');
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



