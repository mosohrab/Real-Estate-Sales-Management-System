import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
  HttpProgressEvent, HttpEventType, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';


@Injectable()
export class UploadInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url === 'http://localhost:15162/1api/ghabz11') {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => Observable.of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).delay(1000));

      const success = Observable.of(new HttpResponse({ status: 200 })).delay(1000);
      events.push(success);

      return Observable.concat(...events);
    }

    // if (req.url === "removeUrl") {
    //     return Observable.of(new HttpResponse({ status: 200 }));
    // }

    return next.handle(req);

  }



}
