import {
  Component, OnInit, Input,
  ViewChild, EventEmitter, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { PersonService, PersonKendoGridService } from '../../../services/person.service';
import { PersonModel } from '../../../model/person.model';
import { PersonSearchComponent } from './person-search.component';

@Component({
  selector: 'app-person-search-dialog',
  templateUrl: './person-search-dialog.component.html',
  styleUrls: ['./person-search-dialog.component.scss'],
  providers: [
    PersonService,
    PersonKendoGridService
  ]
})
export class PersonSearchDialogComponent extends WeBaseKendoGridComponent {

  @ViewChild('personSearch') personSearch: PersonSearchComponent;
  @Output() closedDialog = new EventEmitter<boolean>();
  @Input() search = '';
  public isOpenedDialog = false;

  constructor(router: Router,
    service: PersonKendoGridService
  ) {
    super(service);
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this._service.readGrid();

  }



  public openDialog() {
    this.isOpenedDialog = true;
  }

  onSearch() {
    const id = this.dataItemSelected;
    this._service.removeArrange(this.dataItemSelected);
  }

  public onOk(form) {
    const that = this;
    this.personSearch.getSelectedItems()
      .subscribe(r => {
        const items = r;
        if (items.length > 0) {
          that.onClose();
        }
      });

  }

  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(true);
  }



}
