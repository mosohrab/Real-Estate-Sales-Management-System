
import { Injectable, Inject, ReflectiveInjector, Injector } from '@angular/core';
import {
  Http, Response, ResponseContentType,
  Headers, RequestOptions, RequestMethod, URLSearchParams
} from '@angular/http';

import {
  HttpClient, HttpResponse,
  HttpHeaders, HttpRequest,
  HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


import { NotifyManager } from '../utils/notify-manager';
import { LoadingManager } from '../utils/loading-manager';
import { OperationResultModel } from '../model/operation-result.model';
import { AppConfigService } from '../services/app-config.service';
import { AppModule } from '../../app.module';
import { error } from 'selenium-webdriver';


@Injectable()
export class BaseService {
  configService: AppConfigService;
  loading: LoadingManager;
  notify: NotifyManager;
  private BASE_URL: string;
  public API_URL: string;
  public http: HttpClient;

  constructor(http: HttpClient, apiUrl: string) {
    this.http = http;
    this.configService = AppModule.injector.get(AppConfigService);
    this.BASE_URL = this.configService.config.apiHost;

    this.API_URL = this.BASE_URL + apiUrl;
    this.notify = NotifyManager.createInstance();
    this.loading = LoadingManager.createInstance();

  }


  public get(url?: string): Observable<OperationResultModel> {
    const that = this;
    let httpUrl = `${this.API_URL}`;
    if (url !== undefined) {
      httpUrl += `/${url}`;
    }
    return this.http.get<OperationResultModel>(httpUrl);
  }

  public getAllItems(url?: string): Observable<any[]> {
    const that = this;
    return this.get('getallitems')
      .map((res: OperationResultModel) => {
        let result: any;
        that.operationHandling(res, r => {
          result = r;
        });

        return result || {};
      });


  }


  public getByParam(obj: any, url?: string): Observable<OperationResultModel> {
    const that = this;
    let httpUrl = `${this.API_URL}`;
    if (url !== undefined) {
      httpUrl += `/${url}`;
    }

    let httparams = new HttpParams();
    httparams = this.appendHttpParams(httparams, obj);
    return this.http.get<OperationResultModel>(httpUrl, {
      params: httparams
    });

  }

  public downloadFile(obj: any, url?: string): Observable<Blob> {
    const that = this;
    let httpUrl = `${this.API_URL}`;
    if (url !== undefined) {
      httpUrl += `/${url}`;
    }

    let httparams = new HttpParams();
    httparams = this.appendHttpParams(httparams, obj);

    return this.http.get(httpUrl, {
      params: httparams,
      responseType: 'blob'
    });
    // .map(res => res.())
    // .catch(this.handleError)
  }

  public downloadPdf(html: string, url?: string): void {
    const that = this;
    let httpUrl = `${this.BASE_URL}`;
    if (url !== undefined) {
      httpUrl += `/${url}`;
    } else {
      httpUrl += `export/downloadpdf`;
    }
    const h = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const h = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { htmlString: JSON.stringify(html) };

    this.http.post(httpUrl, JSON.stringify(html), {
      headers: h
    })
      .subscribe((r) => {
      }, err => {
        console.log(err);
      });
    // .map(res => res.())
    // .catch(this.handleError)
  }

  public exportExcel(obj: any): Observable<Blob> {
    return this.downloadFile(obj, 'exportExcel');

  }

  public post(model: any, url?: string): Observable<OperationResultModel> {

    let httparams = new HttpParams();
    httparams = this.appendHttpParams(httparams, model);

    const httpUrl = `${this.API_URL}${url}`;
    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      });

    const that = this;
    // this.loading.show();
    return this.http.post(httpUrl,
      model)
      // httparams, { headers: headers })
      .map((res: OperationResultModel) => res)
      .catch(this.handleError);

  }


  // public postJson(model: any, url?: string): Observable<OperationResultModel> {
  //   const httpUrl = `${this.API_URL}${url}`;
  //   const headers = new HttpHeaders()
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/json');

  //   const that = this;
  //   return this.http.post(httpUrl, model)
  //   //   , {
  //   //     headers: headers
  //   //   }
  //   // )
  //     .map((res: OperationResultModel) => res)
  //     .catch(this.handleError);
  // }


  public put(model: any, url?: string): Observable<OperationResultModel> {
    // const body = JSON.stringify(model);
    //  const body = new URLSearchParams();
    // this.appendParams(body, model);
    let httpUrl = this.API_URL;
    if (url !== undefined) {
      httpUrl += url;
    }

    // const headers = new HttpHeaders(
    //   {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;',
    //     // 'Content-Type': 'application/x-www-form-urlencoded'
    //   });

    const that = this;
    return this.http.put(httpUrl, model)
      .map((res: OperationResultModel) => res)
      .catch(this.handleError);

  }


  public deleteRequest(id: any, url?: string): Observable<OperationResultModel> {
    let httpUrl = this.API_URL;
    if (url !== undefined) {
      httpUrl += { url };
    }

    if (id !== null) {
      httpUrl += '/' + id;
    }
    // const headers = new HttpHeaders(
    //   {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;',
    //     // 'Content-Type': 'application/x-www-form-urlencoded'
    //   });

    const that = this;
    return this.http.delete(httpUrl
      // , { headers: headers }
    ).catch(this.handleError);
  }


  // public addJson(model: any): Observable<OperationResultModel> {
  //   return this.postJson(model, '');
  // }

  public add(model: any): Observable<OperationResultModel> {
    return this.post(model, '');
  }

  public edit(model: any): Observable<OperationResultModel> {
    return this.post(model, '/Edit' /*, 'Edit'*/);
  }


  // public delete(id: number): Observable<OperationResultModel> {
  //   return this.post(id, '/remove/' + id /* 'Delete/' + id*/);
  // }

  public deleteRange(id: Array<number>): Observable<OperationResultModel> {
    let q = '?';
    for (let i = 0; i < id.length; i++) {
      q += `ids=${id[i]}&`;
    }
    return this.post(id, '/deleteRange/' + q);
  }
  // public deleteAll(): Observable<OperationResultModel> {
  //   return this.post(null, '/removeall');
  // }

  public delete(id: number): Observable<boolean> {
    const that = this;
    return this.deleteRequest(id)
      .map((res: OperationResultModel) => {
        let result = false;
        that.operationHandling(res, (r: boolean) => {
          result = r;
        });
        return result || false;

      });
  }

  // public deleteRange(id: Array<number>): Observable<OperationResultModel> {
  //   let q = '?';
  //   for (let i = 0; i < id.length; i++) {
  //     q += `ids=${id[i]}&`;
  //   }
  //   return this.deleteRequest(id, '/deleteRange');
  // }

  public deleteAll(): Observable<OperationResultModel> {
    return this.deleteRequest(null, '/deleteAll');
  }


  public find(id: any): Observable<any> {
    const that = this;
    const httpUrl = `${this.API_URL}/find/${id}`;
    return this.http
      .get(httpUrl)
      .map((res: OperationResultModel) => {
        let result: any;
        that.operationHandling(res, (r) => {
          result = r;
        });
        return result || {};
      });

  }


  protected handleError(err: Response): Observable<any> {
    console.error('observable error: ', err);
    return Observable.throw(err.statusText);
  }


  protected appendParams(params: URLSearchParams, obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.append(key, obj[key]);
      }
    }

  }

  protected appendHttpParams(params: HttpParams, obj: any): HttpParams {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.set(key, obj[key]);
      }
    }
    return params;
  }


  public operationHandling(operation: OperationResultModel,
    successFunc?: any, errorFunc?: any): void {
    this.loading.hide();
    if (operation.error === true) {

      if (errorFunc) {
        errorFunc();
      } else {
        this.notify.showError(operation.errorMessage);
      }
    } else {
      if (5) {
        successFunc(operation.result);
      } else {
        this.notify.showSuccess();
      }
    }

  }


}
