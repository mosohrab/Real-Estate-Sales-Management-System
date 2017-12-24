import {
  Component, OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';

import { BaseComponent } from '../../shared/base.component';
import { CompanyModel } from '../../../model/company.model';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  providers: [
    CompanyService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class CompanyDetailComponent extends BaseComponent {
  _activatedRoute: any;
  _service: CompanyService;
  _router: Router;
  @Input() companyModel = <CompanyModel>{};
  @Input() registerDate: any;

  @Output() saveAndNext = new EventEmitter<boolean>();
  @Output() saveAndClose = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: CompanyService) {
    super();
    this._activatedRoute = activatedRoute;

    this._router = router;
    this._service = service;
    this.datePickerConfig.drops = 'down';
    // this.model.registrationDate = '';
    // this. todayJalali = moment().format('jYYYY/jM/jD');
    // this.model.registrationDate = moment('1395-11-22', 'jYYYY,jMM,jDD').format('jYYYY/jM/jD');

  }

  ngOnInitHandler() {
    // const that = this;
    // this._activatedRoute.params.subscribe(p => {
    //   that.companyModel.companyId = p['id'] as number;

    //   // that._service.find(that.model.companyId).subscribe(r => {
    //   //   that._service.operationHandling(r, (m: CompanyModel) => {
    //   //     that.model = m;
    //   //     that.registerDate = moment(that.model.registrationDate);
    //   //   });
    //   // });

    // });
  }

  private onSave(close: boolean) {
    const that = this;
    that._service.loading.show();
    this.companyModel.registrationDate = this.registerDate.format('YYYY/MM/DD');

    if (this.companyModel.companyId > 0) {
      that._service.edit(this.companyModel)
        .subscribe(res => {
          that._service.notify.showSuccess();

          if (close) {
            that.saveAndClose.emit();
          } else {
            that.saveAndNext.emit();
          }

          //     that._router.navigate(['/company/detail', that.model.companyId, 'special']);
        });
    } else {
      this._service.add(this.companyModel)
        .subscribe(res => {
          that._service.operationHandling(res, (c) => {
            that._service.notify.showSuccess();
            that.companyModel.companyId = c;
            // that._router.navigate(['/company/detail', c, 'special']);

            if (close) {
              that.saveAndClose.emit();
            } else {
              that.saveAndNext.emit();
            }
          });
        });

    }
  }
  public return(): void {
    this.closeDialog.emit();
    // this._router.navigate(['/company']);
  }

}
