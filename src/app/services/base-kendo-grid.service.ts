import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString, toDataSourceRequestString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { process, State } from '@progress/kendo-data-query';
import { BaseService } from './base.service';
// import { NotifyManager } from '../infrastructure/notify-manager';
// import { LoadingManager } from '../infrastructure/loading-manager';
import { NotifyManager } from '../core/utils/notify-manager';
import { LoadingManager } from '../infrastructure/loading-manager';

@Injectable()
export class WeBaseKendoGridService extends BehaviorSubject<GridDataResult> {
  readId: number;
  readIds: number[];
  loading: LoadingManager;
  notify: NotifyManager;
  public _baseService: BaseService;
  protected _http: Http;

  protected dataItems: any[] = [];
  public state: State = {
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: []
    }
  };

  protected CREATE_ACTION = 'create';
  protected UPDATE_ACTION = 'update';
  protected REMOVE_ACTION = 'destroy';


  constructor(http: Http, apiUrl: string, readId: number = 0) {
    super(null);
    this._http = http;
    this.readId = readId;
    this._baseService = new BaseService(http, apiUrl);
    // this.notify = this._baseService.notify;
    // this.loading = this._baseService.loading;

    this.notify = this._baseService.notify;
    this.loading = this._baseService.loading;



  }

  public initBusyConfig(busyConfig) {
    this._baseService.initBusyConfig(busyConfig);
  }



  protected _generateQuery(obj: any): string {

    let r = "";
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        r += `&${key}=${obj[key]}`;
      }
    }
    return r;
  }
  private _readGrid(state: any, search?: string, model?: any): Observable<GridDataResult> {

    const queryStr = `${toDataSourceRequestString(state)}`;

    //  url = url || 'read';
    // var httpUrl=`${this._baseService.API_URL}${url}?${queryStr}`;

    let httpUrl = `${this._baseService.API_URL}`;

    if (this.readIds !== undefined && this.readIds.length > 0) {
      httpUrl += `?id=${this.readIds.join(',')}&${queryStr}`;
    } else if (this.readId !== undefined && this.readId > 0) {
      httpUrl += `?id=${this.readId}&${queryStr}`;
    } else {
      httpUrl += `?${queryStr}`;
    }

    if (search !== undefined && search !== null) {
      httpUrl += `&search=${search}`;
    }


    if (model !== undefined && model !== null) {
      const queryStrModel = this._generateQuery(model);
      if (queryStrModel !== '' && queryStrModel !== '&') {
        httpUrl += `${queryStrModel}`;
      }
    }

    return this._http
      .get(httpUrl)
      .share()
      .map(response => response.json())
      .map(response => (<GridDataResult>{
        data: response.data,
        total: response.total
      }));
  }


  public readGrid(search?: string, model?: any): Subscription {
    const that = this;

    this._baseService.loading.show();
    return this._readGrid(this.state, search, model)
      .subscribe(x => {
        super.next(x);
      })
      .add(x => {
        this._baseService.loading.hide();
      });
  }



  public save(data: any, isNew?: boolean) {
    const action = isNew ? this.CREATE_ACTION : this.UPDATE_ACTION;
    const that = this;
    this._baseService.loading.show();
    if (isNew) {

      this._baseService.add(data).subscribe(
        d => {
          that._baseService.operationHandling(d, (r) => {
            that._baseService.notify.showSuccess();
            that.readGrid();
            that._baseService.loading.hide();
          });
        },
        err => {
          that._baseService.notify.showError(err);
          console.log('error: ', err);
          that._baseService.loading.hide();
        });

    } else {
      this._baseService.edit(data).subscribe(
        d => {
          that._baseService.operationHandling(d, (r) => {
            that._baseService.notify.showSuccess();
            that.readGrid();
            that._baseService.loading.hide();
          });
        },
        err => {
          that._baseService.notify.showError(err);
          console.log('error: ', err);
          that._baseService.loading.hide();
        });
    }
    // this.reset();
    // this.read();
    // this.fetch(action, data)
    //     .subscribe(() => this.read(), () => this.read());
  }

  public remove(id: number) {
    const that = this;
    // this.loading.show();
    this._baseService.delete(id).subscribe(
      d => {
        that._baseService.operationHandling(d, (r) => {
          that._baseService.notify.showSuccess();
          that.readGrid();
        });
        // that.loading.hide();
      },
      err => {
        // console.log('error: ', err)
        that._baseService.notify.showError(err);
        // that.loading.hide();
      }
    );
  }

  public removeArrange(id: Array<number>) {
    const that = this;
    // this.loading.show();
    this._baseService.deleteRange(id).subscribe(
      d => {
        that._baseService.operationHandling(d, (r) => {
          that._baseService.notify.showSuccess();
          that.readGrid();
        });
        // that.loading.hide();
      },
      err => {
        // console.log('error: ', err)
        that._baseService.notify.showError(err);
        // that.loading.hide();
      }
    );
  }

  public removeAll() {
    const that = this;
    // this.loading.show();
    this._baseService.deleteAll().subscribe(
      d => {
        that._baseService.operationHandling(d, (r) => {
          that._baseService.notify.showSuccess();
          that.readGrid();
        });
        // that.loading.hide();
      },
      err => {
        // console.log('error: ', err)
        that._baseService.notify.showError(err);
        // that.loading.hide();
      }
    );
  }


}
