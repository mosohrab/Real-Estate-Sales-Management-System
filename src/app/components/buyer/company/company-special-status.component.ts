import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../shared/base.component';
import { BaseKendoGridComponent } from '../../shared/base-kendo-grid.component';
import { SpecialStatusService } from '../../../services/special-status.service';
import { SpecialStatusValueService } from '../../../services/special-status-value.service';
import { SpecialStatusValueComboComponent } from '../special-status-value/special-status-value-combo.component';
import { CompanyModel, CompanyStatusModel } from '../../../model/company.model';
import { CompanyService, CompanyStatusService, CompanyStatusKendoGridService } from '../../../services/company.service';

@Component({
  selector: 'app-company-special-status',
  templateUrl: './company-special-status.component.html',
  styleUrls: ['./company-special-status.component.scss'],
  providers: [
    CompanyService,
    SpecialStatusService,
    SpecialStatusValueService,
    CompanyStatusService,
    CompanyStatusKendoGridService
  ]
})
export class CompanySpecialStatusComponent extends BaseKendoGridComponent {
  _companyService: CompanyService;
  _service: CompanyStatusKendoGridService;
  // _activatedRoute: ActivatedRoute;
  // _router: Router;
  model = <CompanyStatusModel>{};
  @Input() companyModel = <CompanyModel>{};
  @ViewChild('statusValueCombo') statusValueCombo: SpecialStatusValueComboComponent;

  @Output() afterSave = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(activatedRoute: ActivatedRoute,
    service: CompanyStatusKendoGridService,
    companyService: CompanyService) {
    super(service);
    // this._activatedRoute = activatedRoute;
    this._service = service;
    this._companyService = companyService;
  }

  ngOnInitHandler() {
    this.model.companyId = this.companyModel.companyId;
    this.model.companyName = this.companyModel.companyName;
    this._service.readId = this.companyModel.companyId;

    // const that = this;
    // this._activatedRoute.params.subscribe(params => {
    //   that.model.companyId = params['id'] as number;
    //   that._service.readId = that.model.companyId;
    //   that._service.readGrid();

    //   that._companyService.find(that.model.companyId)
    //     .subscribe(r => {
    //       that._service._companyStatusService.operationHandling(r, (c) => {
    //         const company = <CompanyModel>c;
    //         that.model.companyName = company.companyName;
    //       });

    //     });

    // });
  }


  public onStatusChange(item) {
    this.statusValueCombo.statusId = item;
    this.statusValueCombo.read();

  }

  public onCloseDialog() {
    this.closeDialog.emit();
  }
  public onSaveStatus(form) {
    const that = this;
    that._service.loading.show();

    // if (this.model.companyStatusId > 0) {
    //   that._service._companyStatusService.edit(this.model)
    //     .subscribe(res => {
    //       that._service.notify.showSuccess();
    //       that._service.readGrid();
    //       that.afterSave.emit(true);
    //     });
    // } else {
      this._service._companyStatusService.add(this.model)
        .subscribe(res => {
          that._service._companyStatusService.operationHandling(res, (c) => {
            that._service.notify.showSuccess();
            that.model.companyStatusId = c;
            that._service.readGrid();
            that.afterSave.emit(true);
          });
        });

    // }
  }
}
