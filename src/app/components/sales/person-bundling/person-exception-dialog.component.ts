import {
  Component, OnInit, EventEmitter,
  Input, Output, ViewEncapsulation, ViewChild
} from '@angular/core';
import { PersonExceptionService } from '../../../services/sales.service';
import { PersonExceptionModel, PersonExceptionBulkModel } from '../../../model/sales.model';
import { WeBaseComponent } from '../../we-base.component';
import { OperationResultModel } from '../../../model/operation-result.model';
import { PersonModel } from '../../../model/person.model';
import { PersonSearchComponent } from '../../buyer/person/person-search.component';


@Component({
  selector: 'app-person-exception-dialog',
  templateUrl: './person-exception-dialog.component.html',
  styleUrls: ['./person-exception-dialog.component.scss'],
  providers: [
    PersonExceptionService
  ],

  encapsulation: ViewEncapsulation.None
})
export class PersonExceptionDialogComponent extends WeBaseComponent {
  service: PersonExceptionService;
  model = <PersonExceptionModel>{};
  public isOpenedDialog = false;

  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('personSearch') personSearch: PersonSearchComponent;

  constructor(service: PersonExceptionService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = <PersonExceptionModel>{};
    this.model.personExceptionId = 0;
    this.isOpenedDialog = true;
  }


  public openDialogById(id: number) {
    const that = this;
    this.service.find(id)
      .subscribe(x => {
        that.service.operationHandling(x, (r) => {
          that.model = <PersonExceptionModel>r;
          that.isOpenedDialog = true;
        });

      });
  }




  public onOk(form) {
    const that = this;

    const items = this.personSearch.getSelectedIds();
    if (items.length > 0) {
      that.onSave(items);
    }

    // this.personSearch.getSelectedItems()
    //   .subscribe(r => {
    //     const items = r;
    //     if (items.length > 0) {
    //       that.onSave(items);
    //     }
    //   });



  }

  private onAdd(persons: number[]) {
    const that = this;
    const m = <PersonExceptionBulkModel>{};
    m.hasPermmision = this.model.hasPermmision;
    m.personIds = persons;
    // persons.forEach(p => {
    //   m.personIds.push(p.personId);
    // });

    this.service.add(m)
      .subscribe(res => {
        that.service.operationHandling(res, (r) => {
          if (<boolean>r === true) {
            that.service.notify.showSuccess();
            that.onClose();
          } else {
            that.service.notify.showError();
          }


        });
      });
  }


  private onSave(persons: number[]) {
    const that = this;
    if (this.model.salesPlanId > 0) {

      this.service.put(this.model)
        .subscribe(res => {
          that.service.operationHandling(res, (r) => {
            if (<boolean>r === true) {
              that.service.notify.showSuccess();
              that.onClose();
            } else {
              that.service.notify.showError();
            }

          });
        });

    } else {
      this.onAdd(persons);

    }
  }

  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(true);
  }



}
