import {
  Component, OnInit, Input,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'jalali-moment';

import { WeBaseComponent } from '../../we-base.component';
import { WbsFloorModel } from '../../../model/wbs.model';
import { WbsFloorService } from '../../../services/wbs.service';
import { UsageItemComboSingleComponent } from '../../unit/usage-item/usage-item-combo-single.component';

@Component({
  selector: 'app-wbs-floor-detail',
  templateUrl: './floor-detail.component.html',
  styleUrls: [
    './floor-detail.component.scss'
  ],
  providers: [
    WbsFloorService,
    // {provide: NgbCalendar, useClass: NgbCalendarPersian},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class WbsFloorDetailComponent extends WeBaseComponent {
  _activatedRoute: any;
  _service: WbsFloorService;
  _router: Router;
  model = <WbsFloorModel>{};
  @ViewChild('usageItemCombo') usageItemCombo: UsageItemComboSingleComponent;
  @Input() wbsHid: number;

  constructor(router: Router,
    activatedRoute: ActivatedRoute,
    service: WbsFloorService) {
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
        that._service.operationHandling(res, (r: WbsFloorModel) => {
             if (r.floorId > 0) {
            that.model = r;
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

    if (this.model.floorId > 0) {
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
            that.model.floorId = c;

          });
        });

    }
  }


}
