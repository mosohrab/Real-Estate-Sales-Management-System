
import {
  Component, OnInit,
  ViewChild,
  Input, Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CheckableSettings } from '@progress/kendo-angular-treeview';

import { TreeModel } from '../../../core/model/tree.model';
import { WeBaseComponent, WeBaseTreeComponent } from '../../we-base.component';
import { SpecialStatusModel } from '../../../model/special-status.model';
import { SpecialStatusValueModel } from '../../../model/special-status.model';
import { SpecialStatusService } from '../../../services/special-status.service';
import { SpecialStatusValueService } from '../../../services/special-status-value.service';


@Component({
  selector: 'app-special-status-tree',
  templateUrl: './special-status-tree.component.html',
  styleUrls: ['./special-status-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SpecialStatusService,
    SpecialStatusValueService
  ]
})
export class SpecialStatuTreeComponent extends WeBaseComponent {
  specialStatusService: SpecialStatusService;
  specialStatusValueService: SpecialStatusValueService;
  public data: Observable<TreeModel[]>;
  // public data: Array<TreeModel[]>();

  public checkedKeys: any[] = [''];
  public checkChildren = true;
  public checkParents = true;
  public checkMode: any = 'multiple';
  public selectionMode: any = 'single';
  public expandedKeys: any[] = ['0'];

  constructor(specialStatusService: SpecialStatusService,
    specialStatusValueService: SpecialStatusValueService) {
    super();
    this.specialStatusService = specialStatusService;
    this.specialStatusValueService = specialStatusValueService;


    this.data = new Observable(o => {
      const r = new Array<TreeModel>();
      r.push(<TreeModel>{
        hasChildren: true,
        value: 'ویژگی های خاص'
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
    this.specialStatusService.initBusyConfig(this.busyConfig);


    //  this.data = this.specialStatusService.getTree();

    // this.specialStatusService.getTree()
    //   //   .subscribe((res: TreeModel[]) => {
    //   //     res.forEach(rr => {
    //   //       r.push(rr);
    //   //     });
    //   //   });


  }


  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: this.checkChildren,
      checkParents: this.checkParents,
      mode: this.checkMode
    };
  }

  public hasChildren = (item: TreeModel) => {
    return item.hasChildren;
  }
  public fetchChildren = (item: TreeModel) => {
    if (item.id === undefined) {
      return this.specialStatusService.getTree();

    } else {
      return this.specialStatusValueService.getTree(item.id);
    }
  }



}
