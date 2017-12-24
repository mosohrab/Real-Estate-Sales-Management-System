import { Component } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';


import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n,
   NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [
  //   HTTP_PROVIDERS,

  // ]
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class AppComponent {
  title = 'app';
  template = `<img src="assets/img/loading.gif" />`;

}
