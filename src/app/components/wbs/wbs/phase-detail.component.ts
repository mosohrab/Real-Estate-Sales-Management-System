import {
  Component, OnInit, Input,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';
import { WeBaseComponent } from '../../we-base.component';
import { WbsPhaseModel } from '../../../model/wbs.model';
import { WbsPhaseService } from '../../../services/wbs.service';

import { CountryComboComponent } from '../../shared/country-combo/country-combo.component';
import { ProvinceComboSingleComponent } from '../../shared/province-combo-single/province-combo-single.component';
import { CityComboSingleComponent } from '../../shared/city-combo-single/city-combo-single.component';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';

@Component({
  selector: 'app-wbs-phase-detail',
  templateUrl: './phase-detail.component.html',
  styleUrls: [
    './phase-detail.component.scss'
  ],
  providers: [
    WbsPhaseService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class WbsPhaseDetailComponent extends WeBaseComponent {
  _activatedRoute: any;
  _service: WbsPhaseService;
  _router: Router;
  model = <WbsPhaseModel>{};
  buildDate: any;
  @ViewChild('usageItemCombo') usageItemCombo: UsageItemComboSingleComponent;

  @Input() wbsHid: number;

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: WbsPhaseService) {
    super();
    this._activatedRoute = activatedRoute;

    this._router = router;
    this._service = service;
      }

  ngOnInitHandler() {
    if (this.wbsHid) {
      this.model.wbsHid = this.wbsHid;
      this.setPhase(this.wbsHid);
    }
  }

  public setPhase(wbsHid: number) {
    const that = this;
    this._service.find(wbsHid)
      .subscribe(res => {
        that._service.operationHandling(res, (r: WbsPhaseModel) => {
             if (r.phaseId > 0) {
            that.model = r;
            that.buildDate = moment(r.startBuildDate);
            that.usageItemCombo.setUsageId(r.usageId);
          }
        });
      });
  }


  public onUsageChange(value: any): void {
    this.usageItemCombo.setUsageId(value);
  }



  public saveAndNext(): void {
    const that = this;
    that._service.loading.show();

    if (this.buildDate === undefined || this.buildDate == false) {
      this._service.notify.showWarning('تاریخ شروع را وارد نمایید');
      return;
    }

    this.model.startBuildDate = this.buildDate.format('YYYY/MM/DD');
    if (this.model.phaseId > 0) {
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
            that.model.phaseId = c;
            //   that._router.navigate(['/company/detail', c, 'special']);

          });
        });

    }
  }


}
