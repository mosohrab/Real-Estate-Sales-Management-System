import {
  Component, OnInit, Output,
  ViewEncapsulation, Input,
  EventEmitter, ViewChild
} from '@angular/core';
import { WeBaseComponent } from '../../we-base.component';
import {
  BuyerRangeModel, BuyerRangeValueModel,
  BuyerRangeBulkModel, PersonBundlingType,BuyerRangeAggregateModel
} from '../../../model/sales.model';
import { BuyerRangeService, BuyerRangeValueService } from '../../../services/sales.service';

import { SpecialStatuTreeComponent } from '../../buyer/special-status/special-status-tree.component';
import { PersonSearchComponent } from '../../buyer/person/person-search.component';
import { CompanySearchComponent } from '../../buyer/company/company-search.component';

@Component({
  selector: 'app-person-bundling-dialog',
  templateUrl: './person-bundling-dialog.component.html',
  styleUrls: ['./person-bundling-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BuyerRangeService,
    BuyerRangeValueService
  ]
})
export class PersonBundlingDialogComponent extends WeBaseComponent {
  buyerRangeService: BuyerRangeService;
  buyerRangeValueService: BuyerRangeValueService;
  model = Array<BuyerRangeValueModel>();
  public isOpenedDialog = false;

  @Input() salePlanId: number;
  @Input() hasPermission = true;
  @Input() fillterType : PersonBundlingType;

  fillterTypePersonAndCompany=PersonBundlingType.PersonAndCompany;
  fillterTypePerson=PersonBundlingType.Person;
  fillterTypeCompany=PersonBundlingType.Company;

  @Output() closedDialog = new EventEmitter<boolean>();
  @ViewChild('statusTree') statusTree: SpecialStatuTreeComponent;
  @ViewChild('personSearch') personSearch: PersonSearchComponent;
  @ViewChild('companySearch') companySearch: CompanySearchComponent;


  constructor(buyerRangeService: BuyerRangeService,
    buyerRangeValueService: BuyerRangeValueService) {
    super();
    this.buyerRangeService = buyerRangeService;
    this.buyerRangeValueService = buyerRangeValueService;
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
    const that = this;
    this.model = new Array<BuyerRangeValueModel>();
    //
    if (this.personSearch !== undefined) {
      const personIds = this.personSearch.getSelectedIds();
      if (personIds !== undefined) {
        personIds.forEach(element => {
          that.model.push(<BuyerRangeValueModel>{
            personId: element,
            hasPermission: that.hasPermission
          });
        });
      }
    }

    if (this.companySearch !== undefined) {
      const companyIds = this.companySearch.getSelectedIds();
      if (companyIds !== undefined) {
        companyIds.forEach(element => {
          that.model.push(<BuyerRangeValueModel>{
            companyId: element,
            hasPermission: that.hasPermission
          });
        });
      }
    }
    //
    if (this.statusTree !== undefined) {
      const statusValu = <any[]>this.statusTree.checkedKeys;
      if (statusValu !== undefined) {
        statusValu.forEach(element => {
          if (element !== undefined && element > 0) {
            that.model.push(<BuyerRangeValueModel>{
              specialStatusValueId: <number>element,
              hasPermission: that.hasPermission

            });
          }

        });
      }
    }



    const m = <BuyerRangeBulkModel>{};
    m.buyerRange = <BuyerRangeModel>{
      salesPlanId: this.salePlanId,
      fillterType: this.fillterType
    };
    
    m.buyerRangeValues = this.model;
    this.buyerRangeService.Sync(m)
      .subscribe((r: boolean) => {
        this.onClose();

      });



  }





  onClose() {
    this.isOpenedDialog = false;
    this.closedDialog.emit(true);
  }



}
