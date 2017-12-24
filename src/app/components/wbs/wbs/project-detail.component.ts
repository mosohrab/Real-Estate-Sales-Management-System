import {
  Component, OnInit, Input,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';

import { BaseComponent } from '../../shared/base.component';
import { WbsProjectModel } from '../../../model/wbs.model';
import { WbsProjectService } from '../../../services/wbs.service';

import { CountryComboComponent } from '../../shared/country-combo/country-combo.component';
import { ProvinceComboSingleComponent } from '../../shared/province-combo-single/province-combo-single.component';
import { CityComboSingleComponent } from '../../shared/city-combo-single/city-combo-single.component';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';

@Component({
  selector: 'app-wbs-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [
    './project-detail.component.scss'
  ],
  providers: [
    WbsProjectService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class WbsProjectDetailComponent extends BaseComponent {
  _activatedRoute: any;
  _service: WbsProjectService;
  _router: Router;
  model = <WbsProjectModel>{};
  buildDate: any;

  @Input() wbsHid: number;
  @ViewChild('countryCombo') countryCombo: CountryComboComponent;
  @ViewChild('provinceCombo') provinceCombo: ProvinceComboSingleComponent;
  @ViewChild('cityCombo') cityCombo: CityComboSingleComponent;
  @ViewChild('usageItemCombo') usageItemCombo: UsageItemComboSingleComponent;

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: WbsProjectService) {
    super();
    this._activatedRoute = activatedRoute;

    this._router = router;
    this._service = service;
  }

  ngOnInitHandler() {
    console.log(this.wbsHid);

    this.model.wbsHid = this.wbsHid;
    this.setProject(this.wbsHid);


    // const that = this;
    // this._activatedRoute.params.subscribe(p => {
    //   that.model.companyId = p['id'] as number;
    //   that._service.find(that.model.companyId).subscribe(r => {
    //     that._service.operationHandling(r, (m: CompanyModel) => {
    //       that.model = m;
    //       that.registerDate = moment(that.model.registrationDate);
    //     });
    //   });
    // });
  }

  public setProject(wbsHid: number) {

    const that = this;
    this._service.find(wbsHid)
      .subscribe(res => {
        that._service.operationHandling(res, (r: WbsProjectModel) => {
          if (r.projectId > 0) {
            that.model = r;
            that.buildDate = moment(r.startBuildDate);
            that.usageItemCombo.setUsageId(r.usageId);
          }
        });
      });
  }

  public onCountryChange(value: any): void {
    this.provinceCombo.setCountryId(value);
  }
  public onProvinceChange(value: any): void {
    this.cityCombo.setProvinceId(value);
  }
  public onUsageChange(value: any): void {
    this.usageItemCombo.setUsageId(value);
  }



  public saveAndNext(): void {
    if (this.buildDate === undefined || this.buildDate == false) {
      this._service.notify.showWarning('تاریخ شروع را وارد نمایید');
      return;
    }

    const that = this;
    that._service.loading.show();
    this.model.startBuildDate = this.buildDate.format('YYYY/MM/DD');
    if (this.model.projectId > 0) {
      that._service.edit(this.model)
        .subscribe(res => {

          that._service.notify.showSuccess();
          //  that._router.navigate(['/company/detail', that.model.companyId, 'special']);
        });
    } else {
      this._service.add(this.model)
        .subscribe(res => {
          that._service.operationHandling(res, (c) => {
            that._service.notify.showSuccess();
            that.model.projectId = c;
            //   that._router.navigate(['/company/detail', c, 'special']);

          });
        });

    }
  }

  public return(): void {
    this._router.navigate(['/wbsproject']);
  }

}
