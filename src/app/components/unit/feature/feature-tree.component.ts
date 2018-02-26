
import {
  Component, OnInit,
  ViewChild,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TreeModel } from '../../../core/model/tree.model';
import { WeBaseKendoTreeComponent } from '../../we-base.component';
import { UsageModel } from '../../../model/usage.model';
import { UsageService,UsageItemService } from '../../../services/usage.service';


@Component({
  selector: 'app-feature-tree',
  templateUrl: './feature-tree.component.html',
  styleUrls: ['./feature-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UsageService,
    UsageItemService
  ]
})
export class FeatureTreeComponent extends WeBaseKendoTreeComponent {
  UsageService: UsageService;
  UsageItemService: UsageItemService;
  public data: Observable<TreeModel[]>;
  // public data: Array<TreeModel[]>();

  constructor(UsageService: UsageService,
    UsageItemService: UsageItemService) {
    super();
    this.UsageService = UsageService;
    this.UsageItemService = UsageItemService;


    this.data = new Observable(o => {
      const r = new Array<TreeModel>();
      r.push(<TreeModel>{
        hasChildren: true,
        value: 'کاربری'
      });



      o.next(r);
    });


  }

  ngOnInitHandler() {
    const that = this;
    this.UsageService.initBusyConfig(this.busyConfig);
  }



  public hasChildren = (item: TreeModel) => {
    return item.hasChildren;
  }
  public fetchChildren = (item: TreeModel) => {
    if (item.id === undefined) {
      return this.UsageService.getTree();

    } else {
      return this.UsageItemService.getTree(item.id);
    }
  }



}
