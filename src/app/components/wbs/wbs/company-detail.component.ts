import {
  Component, OnInit, Input,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';

import { CountryModel } from '../../../model/country.model';
import { ProvinceModel } from '../../../model/Province.model';
import { CityModel } from '../../../model/city.model';
import { WeBaseComponent } from '../../we-base.component';
import { WbsCompanyModel } from '../../../model/wbs.model';
import { WbsCompanyService } from '../../../services/wbs.service';
import { CityService } from '../../../services/city.service';

import { CountryComboComponent } from '../../shared/country-combo/country-combo.component';
import { ProvinceComboSingleComponent } from '../../shared/province-combo-single/province-combo-single.component';
import { CityComboSingleComponent } from '../../shared/city-combo-single/city-combo-single.component';

@Component({
  selector: 'app-wbs-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  providers: [
    WbsCompanyService
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class WbsCompanyDetailComponent extends WeBaseComponent {
  _activatedRoute: any;
  service: WbsCompanyService;
  _router: Router;
  model = <WbsCompanyModel>{};
  registerDate: any;

  @Input() wbsHid: number;
  @ViewChild('countryCombo') countryCombo: CountryComboComponent;
  @ViewChild('provinceCombo') provinceCombo: ProvinceComboSingleComponent;
  @ViewChild('cityCombo') cityCombo: CityComboSingleComponent;

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: WbsCompanyService) {
    super();
    this._activatedRoute = activatedRoute;

    this._router = router;
    this.service = service;
  }

  ngOnInitHandler() {
    if (this.wbsHid) {
      this.model.wbsHid = this.wbsHid;
      this.setCompany(this.wbsHid);
    }

  }

  public setCompany(wbsHid: number) {
    const that = this;
    this.service.find(wbsHid)
      .subscribe(res => {
        that.service.operationHandling(res,
          (r: WbsCompanyModel) => {
            if (r.companyId > 0) {
              // this.registerDate = moment(r.registrationDate, 'YYYY/mm/dd').format('jYYYY/jM/jD');
              this.registerDate = moment(r.registrationDate);
              // .format('jYYYY/jM/jD');
              that.model = r;
              that.provinceCombo.setCountryId(r.countryId);
              that.cityCombo.setProvinceId(r.provinceId);
            }
          });
      });
  }

  public onCountryChange(value: number): void {
    this.provinceCombo.setCountryId(value);
  }
  public onProvinceChange(value: number): void {
    this.cityCombo.setProvinceId(value);
  }



  public saveAndNext(): void {
    if (this.registerDate === undefined ||
      this.registerDate == false) {
      this.service.notify.showWarning('تاریخ شروع را وارد نمایید');
      return;
    }

    const that = this;
    that.service.loading.show();
    this.model.registrationDate = this.registerDate.format('YYYY/MM/DD');
    if (this.model.companyId > 0) {
      that.service.edit(this.model)
        .subscribe(res => {

          that.service.notify.showSuccess();
          //  that._router.navigate(['/company/detail', that.model.companyId, 'special']);
        });
    } else {
      this.service.add(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (c) => {
            that.service.notify.showSuccess();
            that.model.companyId = c;
            //   that._router.navigate(['/company/detail', c, 'special']);

          });
        });

    }
  }

  public return(): void {
    this._router.navigate(['/company']);
  }

}
