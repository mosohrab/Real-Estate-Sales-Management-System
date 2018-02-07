import { Injectable } from '@angular/core';
import {
  ConnectionBackend, RequestOptions,
  Request, RequestOptionsArgs,
  Response, Http, Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

/* use

providers: [{
        provide: Http,
        useFactory: (backend: XHRBackend, options: RequestOptions) => {
            return new InterceptedHttp(backend, options);
        },
        deps: [XHRBackend, RequestOptions],
    }],

*/

@Injectable()
export class HttpInterceptedService extends Http {
  loadingBar: SlimLoadingBarService;

  private pendingRequests = 0;
  private showLoading = false;

  constructor(backend: ConnectionBackend,
    defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }



  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.pendingRequests++;
    this.showLoadingBar();
    const that = this;

    return super.request(url, this.getRequestOptionArgs(options))
      .map(res => {
        that.hideLoadingBar();
      }).catch((err: Response) => {
        // Exception handling
        switch (err.status) {
          case 400:
            console.log('interceptor: 400');
            console.log(err);
            break;
          case 404:
            console.log('interceptor: 404');
            console.log(err);
            break;
          case 500:
            console.log('interceptor: 500');
            console.log(err);
            break;
          case 401:
            console.log('interceptor: 401');
            console.log(err);
            break;
          case 403:
            console.log('interceptor: 403');
            console.log(err);
            break;
          default:
            console.log('interceptor: ' + err.status);
            console.log(err);
        }
        return Observable.throw(err);

      });


  }


  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    // هدر درخواست تنظیم
    // const token = localStorage.getItem('token');
    // options.headers.append('Authorization', 'bearer ' + token);


    return options;
  }

  private showLoadingBar() {
    if (!this.showLoading) {
      this.loadingBar.start();
      this.showLoading = true;
    }
  }

  private hideLoadingBar() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      this.loadingBar.complete();
      this.showLoading = false;
    }
  }


}
