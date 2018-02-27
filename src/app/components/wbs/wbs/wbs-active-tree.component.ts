
import {
  Component, OnInit,
  ViewChild,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CheckableSettings } from '@progress/kendo-angular-treeview';

import { TreeModel } from '../../../core/model/tree.model';
import { WeBaseKendoTreeComponent } from '../../we-base.component';
import { WbsService } from '../../../services/wbs.service';


@Component({
  selector: 'app-wbs-active-tree',
  templateUrl: './wbs-active-tree.component.html',
  styleUrls: ['./wbs-active-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    WbsService
  ]
})
export class WbsActiveTreeComponent extends WeBaseKendoTreeComponent {
  service: WbsService;
  public data: Observable<TreeModel[]>;


  constructor(service: WbsService) {
    super();
    this.service = service;

    this.data = new Observable(o => {
      const r = new Array<TreeModel>();
      r.push(<TreeModel>{
        hasChildren: true,
        value: 'همه ساختار',
        id: 0
      });


      // this.specialStatusService.getTree()
      //   .subscribe((res: TreeModel[]) => {
      //     res.forEach(rr => {
      //       if (rr.hasChildren) {
      //         return this.specialStatusValueService.getTree(rr.id)
      //           .subscribe((res2: TreeModel[]) => {
      //             res2.forEach(rr2 => {
      //               rr.children.push(rr2);
      //             });
      //             r.push(rr);
      //           });
      //       } else {
      //         r.push(rr);
      //       }
      //     });
      //   });

      o.next(r);
    });


  }

  ngOnInitHandler() {
    const that = this;
    this.service.initBusyConfig(this.busyConfig);

  }

  public getCheckedKeys() {
    const r = this.checkedKeys;
  }
  public hasChildren = (item: TreeModel) => {
    return item.hasChildren;
  }
  public fetchChildren = (item: TreeModel) => {
    if (item.id === undefined) {
      return this.service.getActiveTreeItems(null);

    } else {
      return this.service.getActiveTreeItems(item.id);
    }
  }



}
