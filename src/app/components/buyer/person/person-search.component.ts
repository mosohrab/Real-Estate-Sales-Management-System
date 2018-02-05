import {
  Component, OnInit, Input,
  ViewChild, EventEmitter, Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { WeBaseKendoGridComponent } from '../../we-base-kendo-grid.component';
import { PersonService, PersonKendoGridService } from '../../../services/person.service';
import { PersonModel } from '../../../model/person.model';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss'],
  providers: [
    PersonService,
    PersonKendoGridService
  ]
})
export class PersonSearchComponent extends WeBaseKendoGridComponent {

  @Output() selected = new EventEmitter<PersonModel[]>();
  @Input() search = '';
  public isOpenedDialog = false;

  constructor(router: Router,
    private personService: PersonService,
    service: PersonKendoGridService
  ) {
    super(service);
  }

  ngOnInitHandler() {
    this._service.initBusyConfig(this.busyConfig);
    this._service.readGrid();

  }



  onSearch() {
    const id = this.dataItemSelected;
    this._service.readGrid(this.search);
  }

  public getSelectedIds(): number[] {

    if (this.dataItemSelected === undefined ||
      this.dataItemSelected.length < 1) {
      this.personService.notify.showWarning('هیچ رکوردی انتخاب نشده');
      return null;
    } else {
      const that = this;
      return <number[]>this.dataItemSelected;
    }
  }


  public getSelectedItems(): Observable<PersonModel[]> {

    if (this.dataItemSelected === undefined ||
      this.dataItemSelected.length < 1) {
      this.personService.notify.showWarning('هیچ رکوردی انتخاب نشده');
      return null;
    } else {
      const that = this;
      return this.personService.findAll(this.dataItemSelected);
    }
  }

  // private onSelected() {
  //   if (this.dataItemSelected === undefined ||
  //     this.dataItemSelected.length < 1) {
  //     this.personService.notify.showWarning('هیچ رکوردی انتخاب نشده');
  //   } else {
  //     const that = this;
  //     this.personService.findAll(this.dataItemSelected)
  //       .subscribe(r => {
  //         that.selected.emit(r);
  //       });
  //   }
  // }



}
