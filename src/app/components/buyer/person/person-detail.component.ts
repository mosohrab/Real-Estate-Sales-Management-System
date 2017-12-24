import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';

import { BaseComponent } from '../../shared/base.component';
import { PersonModel } from '../../../model/person.model';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  providers: [
    PersonService
  ]
})
export class PersonDetailComponent extends BaseComponent {
  service: PersonService;
  @Input() personModel = <PersonModel>{};
  @Input()  birthDate: any;
  @Output() saveAndNext = new EventEmitter<number>();
  @Output() saveAndClose = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<boolean>();



  constructor(service: PersonService) {
    super();
    this.service = service;
    this.datePickerConfig.drops = 'down';
  }

  ngOnInitHandler() {

  }

  public onSave(close: boolean): void {
    const that = this;
    that.service.loading.show();

    if (this.birthDate !== undefined) {
      this.personModel.birthDate = this.birthDate.format('YYYY/MM/DD');
    }

    if (this.personModel.personId > 0) {
      that.service.edit(this.personModel)
        .subscribe(res => {
          that.service.notify.showSuccess();

          if (close) {
            that.saveAndClose.emit();
          } else {
            that.saveAndNext.emit(this.personModel.personId);
          }

        });
    } else {
      this.service.add(this.personModel)
        .subscribe(res => {
          that.service.operationHandling(res, (c) => {
            that.service.notify.showSuccess();
            that.personModel.personId = c;

            if (close) {
              that.saveAndClose.emit();
            } else {
              that.saveAndNext.emit(c);
            }

          });
        });

    }
  }

  public return(): void {
    this.closeDialog.emit();
  }

}
