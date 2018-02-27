
import {
  Component, OnInit,
  ViewChild,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TreeModel } from '../../../core/model/tree.model';
import { WeBaseKendoTreeComponent } from '../../we-base.component';
import { UnitFeatureTitleService, UnitFeatureValueService } from '../../../services/unit-feature.service';


@Component({
  selector: 'app-feature-tree',
  templateUrl: './feature-tree.component.html',
  styleUrls: ['./feature-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UnitFeatureTitleService,
    UnitFeatureValueService
  ]
})
export class FeatureTreeComponent extends WeBaseKendoTreeComponent {

  @Input() featureId: number;

  UnitFeatureTitleService: UnitFeatureTitleService;
  UnitFeatureValueService: UnitFeatureValueService;
  public data: Observable<TreeModel[]>;
  // public data: Array<TreeModel[]>();

  constructor(UnitFeatureTitleService: UnitFeatureTitleService,
    UnitFeatureValueService: UnitFeatureValueService) {
    super();
    this.UnitFeatureTitleService = UnitFeatureTitleService;
    this.UnitFeatureValueService = UnitFeatureValueService;


  }

  ngOnInitHandler() {
    const that = this;
    this.UnitFeatureTitleService.initBusyConfig(this.busyConfig);

    let val = 'ویژگی ها عمومی';
    if (this.featureId > 1) {
      val = 'ویژگی ها انتخابی';
    }

    this.data = new Observable(o => {
      const r = new Array<TreeModel>();
      r.push(<TreeModel>{
        hasChildren: true,
        value: val
      });

      o.next(r);
    });


  }



  public hasChildren = (item: TreeModel) => {
    return item.hasChildren;
  }
  public fetchChildren = (item: TreeModel) => {

    if (item.id === undefined) {
      return this.UnitFeatureTitleService.getTree(this.featureId);

    } else {
      return this.UnitFeatureValueService.getTree(item.id);
    }
  }



}
