import { Injectable, Inject, ReflectiveInjector, Injector } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';


import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest,
  HttpParams

} from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
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


@Injectable()
export class BaseService {
  configService: AppConfigService;
  loading: LoadingManager;
  notify: NotifyManager;
  private BASE_URL: string;
  public API_URL: string;
  public http: HttpClient;

  constructor(http: HttpClient, apiUrl: string) {

    // this.http = AppModule.injector.get(HttpClient);
    this.http = http;
    // if (!BASE_URL) {
    this.configService = AppModule.injector.get(AppConfigService);
    this.BASE_URL = this.configService.config.apiHost;
    // }

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

    let httparams = new HttpParams(
      // {
      //    fromString: 'orderBy="$key"&limitToFirst=1'
      // }
    );
    // .set('rrr', '"$key"');

    httparams = this.appendHttpParams(httparams, obj);
    return this.http.get<OperationResultModel>(httpUrl, {
      // headers: null,
      // observe: 'body',
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

    // return this.http.get<OperationResultModel>(httpUrl, {
    //   // headers: null,
    //   // observe: 'body',
    //   params: httparams
    // });


    // let options = new RequestOptions(
    //   {
    //     params: httparams,
    //     responseType: ResponseContentType.Blob
    //   });
    return this.http.get(httpUrl, {
      params: httparams,
      responseType: 'blob'
    });
    // .map(res => res.())
    // .catch(this.handleError)


  }

  public exportExcel(obj: any): Observable<Blob> {
    return this.downloadFile(obj, 'exportExcel');

  }

  public post(model: any, url?: string): Observable<OperationResultModel> {
    // const body = JSON.stringify(model);
    const body = new URLSearchParams();
    this.appendParams(body, model);
    const httpUrl = `${this.API_URL}${url}`;

    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      });

    const that = this;
    // this.loading.show();
    return this.http.post(httpUrl, body, { headers: headers })
      //  .map(this.extractData)
      .map((res) => {
        debugger;
        // that.operationHandling(<OperationResultModel>res);
        //  that.loading.hide();
      })
      .catch(this.handleError);



    //     const requestoptions = new RequestOptions({
    //       method: RequestMethod.Post,
    //       url: httpUrl,
    //       headers: headers,
    //       body: body,
    //       params: body,
    //   });
    //   return this._http  .request(new Request(requestoptions))
    //   .map(this.extractData)
    //   .catch(this.handleError);
    // // }

  }

  public postJson(model: any, url?: string): Observable<OperationResultModel> {
    const body = new URLSearchParams();
    this.appendParams(body, model);
    const httpUrl = `${this.API_URL}${url}`;
    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      });

    const that = this;
    return this.http.post(httpUrl, body, {
      headers: headers
    }).map((res: Response) => res.json())
      .catch(this.handleError);
  }


  public put(model: any, url?: string): Observable<OperationResultModel> {
    const body = JSON.stringify(model);
    //  const body = new URLSearchParams();
    // this.appendParams(body, model);
    const httpUrl = `${this.API_URL}${url}`;

    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json;',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      });

    const that = this;
    return this.http.put(httpUrl, body, { headers: headers })
      //  .map(this.extractData)
      .map(res => {
        debugger;
        // const b = res.json();
        // that.operationHandling(b);
      })
      .catch(this.handleError);
  }

  public deleteRequest(id: any, url?: string): Observable<OperationResultModel> {
    const httpUrl = `${this.API_URL}${url}/${id}`;
    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json;',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      });

    const that = this;
    return this.http.delete(httpUrl, { headers: headers })
      //  .map(this.extractData)
      .map(res => {
        debugger;
        // const b = res.json();
        // that.operationHandling(b);
      })
      .catch(this.handleError);
  }


  public add(model: any): Observable<OperationResultModel> {
    return this.postJson(model, '');
  }
  public edit(model: any): Observable<OperationResultModel> {
    return this.postJson(model, '/Edit' /*, 'Edit'*/);
  }
  public delete(id: number): Observable<OperationResultModel> {
    return this.postJson(id, '/remove/' + id /* 'Delete/' + id*/);
  }
  public deleteRange(id: Array<number>): Observable<OperationResultModel> {
    let q = '?';
    for (let i = 0; i < id.length; i++) {
      q += `ids=${id[i]}&`;
    }
    return this.postJson(id, '/removerange/' + q);
  }
  public deleteAll(): Observable<OperationResultModel> {
    return this.postJson(null, '/removeall');
  }


  public find(id: any): Observable<any> {
    const that = this;
    const httpUrl = `${this.API_URL}/find/${id}`;
    return this.http
      .get(httpUrl)
      .map(res => {
        debugger;
        //  const b = res.json();
        //   return b;
      });


  }



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

  private appendHttpParams(params: HttpParams, obj: any): HttpParams {

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
