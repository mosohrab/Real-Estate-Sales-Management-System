import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
  HttpProgressEvent, HttpEventType, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  loadingBar: SlimLoadingBarService;

  private pendingRequests = 0;
  private showLoading = false;

  constructor(loadingBar: SlimLoadingBarService) {
    this.loadingBar = loadingBar;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.pendingRequests++;
    this.showLoadingBar();
    this.loadingBar.start();
    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // this.loadingBar.complete();
          this.hideLoadingBar();
        }
      },
      (err: any) => {
        // this.loadingBar.complete();
        this.hideLoadingBar();
      });

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
