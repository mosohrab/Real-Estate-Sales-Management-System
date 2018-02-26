import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { HTTP_PROVIDERS } from '@angular/http';


import {
  NgbDateStruct, NgbCalendar, NgbDatepickerI18n,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
import { WeBaseComponent } from './components/we-base.component';
import { BaseService } from './services/base.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [
    BaseService,
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class LoginComponent extends WeBaseComponent {
  isLogin=false;
  password: string;
  constructor(private route: Router) {
    super();

  }

  login() {
    if (this.password == '09125719824') {
      this.isLogin=true;
      // this.route.navigate(['/']);
    }
    else {
      // this.service.notify.showError("رمز عبور صحیح نمی باشد")
    }
  }
}



