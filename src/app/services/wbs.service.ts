import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseService } from './base.service';
import { WeBaseKendoGridService } from './base-kendo-grid.service';
import { UrlHelper } from '../infrastructure/url-helper';
import { TreeModel } from '../ng2-tree/src/tree.types';
import { WbsStructureModel } from '../model/wbs.model';


@Injectable()
export class WbsService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBS_API);
    }


    public getTreeItems(id: number): Observable<TreeModel[]> {
        return this.get('/gettreeitems/' + id)
            .map(res => {
                const r = Array<TreeModel>();
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    r.push(<TreeModel>{
                        id: item.id,
                        value: item.value,
                        children: Array<TreeModel>(),
                        emitLoadNextLevel: item.hasChildren,
                        level: Number(item.level)
                    });
                }
                return r;

            });

    }

    public getActiveTreeItems(id: number): Observable<TreeModel[]> {
        return this.get('/getActiveTree/' + id)
            .map(res => {
                const r = Array<TreeModel>();
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    r.push(<TreeModel>{
                        id: item.id,
                        value: item.value,
                        children: Array<TreeModel>(),
                        emitLoadNextLevel: item.hasChildren,
                        level: Number(item.level),
                        hasChildren: item.hasChildren
                    });
                }
                return r;

            });

    }

    // public getStructure(id: number): Observable<TreeModel[]> {
    //     return this.get('/getstructure')
    //         .map(res => {
    //             const r = Array<TreeModel>();
    //             for (let i = 0; i < res.length; i++) {
    //                 const item = res[i];
    //                 r.push(<TreeModel>{
    //                     id: item.id,
    //                     value: item.value,
    //                     children: Array<TreeModel>(),
    //                     emitLoadNextLevel: item.hasChildren,
    //                     level: Number(item.level)

    //                 });
    //             }
    //             return r;

    //         });

    // }


}

@Injectable()
export class WbsKendoGridService extends WeBaseKendoGridService {
    featureService: WbsService;

    constructor(http: Http, service: WbsService) {
        super(http, UrlHelper.WBS_API);

        this.featureService = service;
    }

}

// @Injectable()
// export class UnitFeatureComboService extends BehaviorSubject<UnitFeatureModel[]> {

//     _baseService: BaseService;
//     constructor(http: Http) {
//         super(null);
//         this._baseService = new BaseService(http, UrlHelper.UNITFEATURE_API + '/');
//     }

//     public read(): void {
//         this._baseService.get('getallitems')
//             .subscribe(x => super.next(x));

//     }

// }



// ==============================================


@Injectable()
export class WbsStructureService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSSTRUCTURE_API);
    }


    public getAllItems(): Observable<WbsStructureModel[]> {
        return this.get('/getAllItems');
        // .map(res => {
        //     // const r = Array<WbsStructureModel>();
        // });

    }
}


@Injectable()
export class WbsStructureKendoGridService extends WeBaseKendoGridService {
    baseService: WbsStructureService;

    constructor(http: Http, service: WbsStructureService) {
        super(http, UrlHelper.WBSSTRUCTURE_API);
        this.baseService = service;
    }

}



// ==============================================

@Injectable()
export class WbsCompanyService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSCOMPANY_API);
    }
}


// ==============================================

@Injectable()
export class WbsProjectService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSPROJECT_API);
    }
}

// ==============================================

@Injectable()
export class WbsPhaseService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSPHASE_API);
    }
}

// ==============================================

@Injectable()
export class WbsBlockService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSBLOCK_API);
    }
}

// ==============================================

@Injectable()
export class WbsFloorService extends BaseService {

    constructor(http: Http) {
        super(http, UrlHelper.WBSFLOOR_API);
    }
}
