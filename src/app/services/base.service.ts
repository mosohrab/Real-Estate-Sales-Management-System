import { Injectable, Inject, ReflectiveInjector, Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


import { NotifyManager } from '../infrastructure/notify-manager';
import { LoadingManager } from '../infrastructure/loading-manager';
import { UrlHelper } from '../infrastructure/url-helper';
import { OperationResultModel } from '../model/operation-result.model';

import { AppModule } from '../app.module';
import { AppConfigService } from 'ng2-aryanet-core';


@Injectable()
export class BaseService {
  configService: AppConfigService;
  loading: LoadingManager;
  notify: NotifyManager;
  private BASE_URL: string;
  public API_URL: string;
  protected _http: Http;
  protected urlHelper: UrlHelper;

  constructor(http: Http, apiUrl: string) {
    this._http = http;

    // if (!UrlHelper.BASE_URL) {
    this.configService = AppModule.injector.get(AppConfigService);
    this.BASE_URL = this.configService.config.apiHost;
    // }

    this.API_URL = this.BASE_URL + apiUrl;
    this.notify = NotifyManager.createInstance();
    this.loading = LoadingManager.createInstance();

  }
  initBusyConfig(busyConfig) {
    this.loading.initBusyConfig(busyConfig);
  }

  public get(url?: string): Observable<any[]> {

    const that = this;
    const httpUrl = `${this.API_URL}${url}`;
    return this._http
      .get(httpUrl)
      .map(res => {
        const b = res.json();
        return b;
      });
    // .map(response =>{
    //    response.json();
    //   this.loading.show();
    // });
  }

  public post(model: any, url?: string): Observable<OperationResultModel> {
    // const body = new URLSearchParams();
    // this.appendParams(body, model);
    let httpUrl = `${this.API_URL}`;
    if (url !== undefined) {
      httpUrl += `${url}`;
    }
    // const headers = new Headers(
    //   {
    //     'Accept': 'application/json',
    //     // 'Content-Type': 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   });

    // const options = new RequestOptions({
    //   headers: headers,
    //   // params : body
    // });

    const that = this;
    // this.loading.show();
    return this._http.post(httpUrl, model)
      .map(res => {
        const b = res.json();
        // const r = body.fields || {};
        that.operationHandling(b);
        //  that.loading.hide();
      })
      .catch(this.handleError);

  }

  // public postJson(model: any, url?: string): Observable<OperationResultModel> {
  //   const body = new URLSearchParams();
  //   this.appendParams(body, model);
  //   const httpUrl = `${this.API_URL}${url}`;
  //   const headers = new Headers(
  //     {
  //       'Accept': 'application/json',
  //       // 'Content-Type': 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     });

  //   const options = new RequestOptions({
  //     headers: headers,
  //     // params : body
  //   });

  //   const that = this;
  //   return this._http.post(httpUrl, body, options)
  //     .map((res: Response) => res.json())
  //     .catch(this.handleError);
  // }


  public put(model: any, url?: string): Observable<OperationResultModel> {
    let httpUrl = `${this.API_URL}`;
    if (url !== undefined) {
      httpUrl += url;
    }

    const that = this;
    return this._http.put(httpUrl, model)
      .map(res => {
        const b = res.json();
        that.operationHandling(b);
      })
      .catch(this.handleError);
  }




  public deleteRequest(id: any, url?: string): Observable<OperationResultModel> {
    const httpUrl = `${this.API_URL}${url}/${id}`;
    const headers = new Headers(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json;',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      });

    const options = new RequestOptions({ headers: headers });
    const that = this;
    return this._http.delete(httpUrl, options)
      //  .map(this.extractData)
      .map(res => {
        const b = res.json();
        // const r = body.fields || {};
        that.operationHandling(b);
      })
      .catch(this.handleError);
  }


  public add(model: any): Observable<OperationResultModel> {
    // return this.post(model, 'Add');
    return this.post(model, '');
  }
  public edit(model: any): Observable<OperationResultModel> {
    return this.post(model, '/Edit' /*, 'Edit'*/);
  }
  public delete(id: number): Observable<OperationResultModel> {
    return this.post(id, '/remove/' + id /* 'Delete/' + id*/);
  }
  public deleteRange(id: Array<number>): Observable<OperationResultModel> {
    let q = '?';
    for (let i = 0; i < id.length; i++) {
      q += `ids=${id[i]}&`;
    }
    return this.post(id, '/removerange' + q);
  }
  public deleteAll(): Observable<OperationResultModel> {
    return this.post(null, '/removeall');
  }

  // public find(id: number): Observable<OperationResultModel> {
  //   const that = this;
  //   const httpUrl = `${this.API_URL}/find/${id}`;
  //   return this._http
  //     .get(httpUrl)
  //     .map(res => {
  //       const b = res.json();
  //       return b;
  //     });


  // }

  public find(id: any): Observable<OperationResultModel> {
    const that = this;
    const httpUrl = `${this.API_URL}/find/${id}`;
    return this._http
      .get(httpUrl)
      .map(res => {
        const b = res.json();
        // that.operationHandling(b, (c) => {
        //   return c;
        // });
        return b;
      });


  }


  public findAll(id: number[]): Observable<any[]> {
    const that = this;

    let q = '?';
    for (let i = 0; i < id.length; i++) {
      q += `ids=${id[i]}&`;
    }
    const httpUrl = `${this.API_URL}/findall${q}`;

    return this._http
      .get(httpUrl)
      .map(res => {
        const b = res.json();
        let r: any[];
        that.operationHandling(b, (c) => {
          r = c;
        });
        return r || [];
      });

  }



  // protected extractData(res: Response, successFunc?: any, errorFunc?: any) {
  //   const body = res.json();
  //  // const r = body.fields || {};
  //   this.operationHandling(JSON.parse(body) as OperationResultModel , successFunc, errorFunc );
  // }

  protected handleError(error: Response): Observable<any> {

    console.error('observable error: ', error);
    //   this.loading.hide();
    return Observable.throw(error.statusText);
  }


  private appendParams(params: URLSearchParams, obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.append(key, obj[key]);
      }
    }


    //  body.set('ProvinceId', '15');
    //  body.set('ProvinceName','ییسبیس');
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
      if (successFunc) {
        successFunc(operation.result);
      } else {
        this.notify.showSuccess();
      }
    }

  }


}
