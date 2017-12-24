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
import { SpecialStatusValueComboComponent } from '../special-status-value/special-status-value-combo.component';
import { SpecialStatusService } from '../../../services/special-status.service';
import { SpecialStatusValueService } from '../../../services/special-status-value.service';

import { PersonModel, PersonStatusModel } from '../../../model/person.model';
import { PersonService, PersonStatusService, PersonStatusKendoGridService } from '../../../services/person.service';

@Component({
  selector: 'app-person-special-status',
  templateUrl: './person-special-status.component.html',
  styleUrls: ['./person-special-status.component.scss'],
  providers: [
    PersonService,
    SpecialStatusService,
    SpecialStatusValueService,
    PersonStatusService,
    PersonStatusKendoGridService
  ]
})
export class PersonSpecialStatusComponent extends BaseKendoGridComponent {
  _personService: PersonService;
  _service: PersonStatusKendoGridService;
  _activatedRoute: ActivatedRoute;
  _router: Router;
  model = <PersonStatusModel>{};
  @Input() personModel = <PersonModel>{};
  @ViewChild('statusValueCombo') statusValueCombo: SpecialStatusValueComboComponent;
  @Output() afterSave = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<boolean>();


  constructor(activatedRoute: ActivatedRoute,
    service: PersonStatusKendoGridService,
    personService: PersonService) {
    super(service);
    this._activatedRoute = activatedRoute;
    this._service = service;
    this._personService = personService;
  }

  ngOnInitHandler() {

    this.model.personId = this.personModel.personId;
    this._service.readId = this.personModel.personId;


    // const that = this;
    // this._activatedRoute.params.subscribe(params => {
    //   console.log(params);
    //   that.model.personId = params['id'] as number;
    //   that._service.readId = that.model.personId;
    //   that._service.readGrid();

    //   that._service._personStatusService.find(that.model.personId)
    //     .subscribe(r => {

    //       that._personService.operationHandling(r, (c) => {
    //         const m = <PersonModel>c;
    //         that.model.personFirstName = m.firstName;
    //         that.model.personLastName = m.lastName;
    //         that.model.personAliasName = m.aliasName;
    //       });

    //     });

    // });
  }

  public onCloseDialog() {
    this.closeDialog.emit();
  }

  public onStatusChange(item) {
    this.statusValueCombo.statusId = item;
    this.statusValueCombo.read();

  }


  public onSaveStatus(form) {
    const that = this;
    that._service.loading.show();

    // if (this.model.personStatusId > 0) {
    //   that._service._personStatusService.edit(this.model)
    //     .subscribe(res => {
    //       that._service.notify.showSuccess();
    //       that._service.readGrid();
    //       that.afterSave.emit(true);
    //     });
    // } else {
      this._service._personStatusService.add(this.model)
        .subscribe(res => {
          that._service._personStatusService.operationHandling(res, (c) => {
            that._service.notify.showSuccess();
            that.model.personStatusId = c;
            that._service.readGrid();
            that.afterSave.emit(true);
          });
        });

    // }
  }


}
