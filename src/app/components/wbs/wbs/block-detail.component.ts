import {
  Component, OnInit, Input,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';

import { BaseComponent } from '../../shared/base.component';
import { WbsBlockModel } from '../../../model/wbs.model';
import { WbsBlockService } from '../../../services/wbs.service';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';

@Component({
  selector: 'app-wbs-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: [
    './block-detail.component.scss'
  ],
  providers: [
    WbsBlockService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class WbsBlockDetailComponent extends BaseComponent {
  _activatedRoute: any;
  _service: WbsBlockService;
  _router: Router;
  model = <WbsBlockModel>{};
  buildDate: any;
  @ViewChild('usageItemCombo') usageItemCombo: UsageItemComboSingleComponent;
  @Input() wbsHid: number;

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: WbsBlockService) {
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
        that._service.operationHandling(res, (r: WbsBlockModel) => {
          if (r.blockId > 0) {
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
    if (this.model.blockId > 0) {
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
            that.model.blockId = c;
            //   that._router.navigate(['/company/detail', c, 'special']);

          });
        });

    }
  }


}
