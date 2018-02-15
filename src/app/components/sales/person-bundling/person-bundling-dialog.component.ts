import {
  Component, OnInit, Output,
  ViewEncapsulation,
  EventEmitter, ViewChild
} from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import { BuyerRangeValueModel } from '../../../model/sales.model';
import { BuyerRangeValueService } from '../../../services/sales.service';

import { SpecialStatuTreeComponent } from '../../buyer/special-status/special-status-tree.component';
import { PersonSearchComponent } from '../../buyer/person/person-search.component';

@Component({
  selector: 'app-person-bundling-dialog',
  templateUrl: './person-bundling-dialog.component.html',
  styleUrls: ['./person-bundling-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BuyerRangeValueService
  ]
})
export class PersonBundlingDialogComponent extends WeBaseComponent {
  service: BuyerRangeValueService;
  model = Array<BuyerRangeValueModel>();
  public isOpenedDialog = false;

  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('personDialog') personDialog: PersonSearchComponent;


  constructor(service: BuyerRangeValueService) {
    super();
    this.service = service;
  }

  ngOnInitHandler() {
  }


  public openDialog() {
    this.model = new Array<BuyerRangeValueModel>();
    this.isOpenedDialog = true;
  }



  public openDialogById(id: number) {
    const that = this;
    // this.service.find(id)
    //   .subscribe(x => {
    //     that.service.operationHandling(x, (r) => {
    //       that.model = <BuyerRangeValueModel>r;

    //       that.isOpenedDialog = true;
    //     });

    //   });

  }




  public onOk(form) {

    this.model = new Array<BuyerRangeValueModel>();
    const that = this;
    if (this.personDialog !== undefined) {
      const personIds = this.personDialog.getSelectedIds();
      personIds.forEach(element => {
        that.model.push(<BuyerRangeValueModel>{
          personId: element

        });


      });
    }


  }


  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(true);
  }



}
