
import {
  Component, OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { TreeModel } from '../../../ng2-tree/src/tree.types';
import { Tree } from '../../../ng2-tree/src/tree';
import {
  LoadNextLevelEvent,
  NodeSelectedEvent,
  NodeRemovedEvent,
  NodeCollapsedEvent,
  NodeCreatedEvent,
  NodeRenamedEvent,
  NodeExpandedEvent,
  NodeMovedEvent,
  NodeEvent
} from '../../../ng2-tree/src/tree.events';
import {
  NodeMenuItemSelectedEvent,
  NodeMenuItemAction,
  NodeMenuAction
} from '../../../ng2-tree/src/menu/menu.events';
import { NodeMenuItem } from '../../../ng2-tree/src/menu/node-menu.component';
import { WeBaseComponent, WeBaseTreeComponent } from '../../we-base.component';
import { WbsStructureService, WbsService } from '../../../services/wbs.service';
import { WbsStructureModel, WbsModel } from '../../../model/wbs.model';
import { WbsCompanyDetailComponent } from './company-detail.component';
import { WbsProjectDetailComponent } from './project-detail.component';
import { WbsUpsertComponent } from './wbs-upsert.component';
import { OperationResultModel } from '../../../model/operation-result.model';

@Component({
  selector: 'app-wbs',
  templateUrl: './wbs.component.html',
  styleUrls: ['./wbs.component.scss'],
  providers: [
    WbsStructureService,
    WbsService
  ],
  encapsulation: ViewEncapsulation.None
})
export class WbsComponent extends WeBaseTreeComponent {
  _structureService: WbsStructureService;
  // extends BaseKendoGridComponent {
  private _wbsService: WbsService;
  structureModel = Array<WbsStructureModel>();
  // @ViewChild('treeControl')
  currentLevel: number;
  currentId: number;

  @ViewChild('companyDetail') companyDetail: WbsCompanyDetailComponent;
  @ViewChild('projectDetail') projectDetail: WbsProjectDetailComponent;
  @ViewChild('wbsUpsert') wbsUpsert: WbsUpsertComponent;

  public tree: TreeModel;
  // private ziroLeveMenu = <NodeMenuItem[]>[
  //   {
  //     name: 'شرکت جدید',
  //     action: NodeMenuItemAction.NewCompany,
  //     cssClass: 'new-tag new-company',
  //     // preExecute: function (event: NodeMenuItemSelectedEvent) {

  //     // },
  //     // execute: function (node: any, event: NodeMenuItemSelectedEvent) {

  //     // },
  //     // postExecute: (event: NodeEvent) => {

  //     //   const model = <WbsModel>this._getModel(event, 1);
  //     //   this.wbsUpsert.openDialog(model);
  //     //   // this._addWbs(event, 1);
  //     // }
  //     // execute: (r: NodeMenuItemSelectedEvent) => {
  //     //   this.wbsUpsert.openDialog()
  //     // }
  //   }
  // ];
  // oneLeveMenu = <NodeMenuItem[]>[
  //   {
  //     name: 'پروژه جدید',
  //     action: NodeMenuItemAction.NewProject,
  //     cssClass: 'new-tag  new-project',
  //     // preExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // },
  //     // postExecute: (event: NodeEvent) => {

  //     //   const model = <WbsModel>this._getModel(event, 2);
  //     //   this.wbsUpsert.openDialog(model);
  //     //   //  this._addWbs(event, 2);
  //     // }
  //   }
  // ];
  // twoLeveMenu = <NodeMenuItem[]>[
  //   {
  //     name: 'فاز جدید',
  //     action: NodeMenuItemAction.NewPhase,
  //     cssClass: 'new-tag  new-phase',
  //     // postExecute: (event: NodeEvent) => {

  //     //   const model = <WbsModel>this._getModel(event, 3);
  //     //   this.wbsUpsert.openDialog(model);
  //     //   // this._addWbs(event, 3);
  //     // }
  //     // preExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // },
  //     // postExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // }
  //   }
  // ];
  // threeLeveMenu = <NodeMenuItem[]>[
  //   {
  //     name: 'بلوک جدید',
  //     action: NodeMenuItemAction.NewTag,
  //     cssClass: 'new-tag   new-block',
  //     postExecute: function (event) {

  //       this._addWbs(event, 4);

  //     }
  //     // preExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // },
  //     // postExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // }
  //   }
  // ];
  // fourLeveMenu = <NodeMenuItem[]>[
  //   {
  //     name: 'طبقه جدید',
  //     action: NodeMenuItemAction.NewTag,
  //     cssClass: 'new-tag new-floor',
  //     postExecute: function (event) {

  //       // this.newLevel = 4;
  //       this._addWbs(event, 5);
  //     }
  //     // preExecute: function (event: NodeMenuItemSelectedEvent) {
  //     //   //  console.log(tree)
  //     // },
  //     // postExecute: function (event: NodeMenuItemSelectedEvent) {

  //     //   //  console.log(tree)
  //     // }
  //   }
  // ];

  shareLeverMemu = <NodeMenuItem[]>[
    {
      name: 'ویرایش ',
      action: NodeMenuItemAction.Rename,
      cssClass: 'custom-menu-item',
      //   execute: function (event: NodeMenuItemSelectedEvent) {

      //   }
    },
    {
      name: 'حذف',
      action: NodeMenuItemAction.Remove,
      cssClass: 'custom-menu-item',
      // execute: function (event: NodeMenuItemSelectedEvent) {

      // }
    }
  ];

  private _getModel(event: NodeEvent): WbsModel {
    const p = <TreeModel>event.node.parent.node;
    const t = <TreeModel>event.node.node;
    const structureHid =
      // <NodeMenuItemSelectedEvent>event.node.nodeMenuSelected;
      <number>event.node.nodeMenuSelected.level;

    const model = <WbsModel>{
      parentWbsHid: p.id,
      level: (p.level + 1),
      name: t.value,
      structureHid: <number>structureHid
    };
    return model;
  }
  private _addWbs(event: NodeEvent): void {
    const model = this._getModel(event);
    this._wbsService.loading.show();
    const that = this;
    this._wbsService.add(model)
      .subscribe(r => {
        that._wbsService.operationHandling(r, (d) => {
          that._wbsService.notify.showSuccess();
          // that._initTree();
        }, (er) => {
          this._wbsService.notify.showError(r.errorMessage);
          event.node.parent.removeChild(event.node);
          event.node.parent.reloadChildren();
        });

        this._wbsService.loading.hide();
      });
  }

  constructor(service: WbsService, structureService: WbsStructureService) {
    super();

    this._wbsService = service;
    this._structureService = structureService;

  }

  ngOnInitHandler() {
    const that = this;
    this._wbsService.initBusyConfig(this.busyConfig);
    this._wbsService.loading.show();

    this._structureService.getAllItems()
      .subscribe((res: Array<WbsStructureModel>) => {
        that.structureModel = res;
        that._initTree();
      });


  }


  protected createdHandler(event: NodeCreatedEvent) {
    this._addWbs(event);
  }


  protected removedHandler(event: NodeRemovedEvent) {
    this._wbsService.loading.show();
    const that = this;
    this._wbsService.delete(<number>event.node.id)
      .subscribe(r => {
        that._wbsService.operationHandling(r, (d) => {
          that._wbsService.notify.showSuccess();
          // that._initTree();
        }, (er) => {
          this._wbsService.notify.showError(r.errorMessage);
          event.node.parent.addChild(event.node, event.lastIndex);
          event.node.parent.reloadChildren();
        });
        that._wbsService.loading.hide();
      });
  }

  protected renamedHandler(event: NodeRenamedEvent) {
    const t = <TreeModel>event.node.node;
    const model = <WbsModel>{
      wbsHid: <number>t.id,
      name: <string>t.value
    };

    this._wbsService.loading.show();

    const that = this;
    this._wbsService.edit(model)
      .subscribe((r: OperationResultModel) => {

        that._wbsService.operationHandling(r, (d) => {
          that._wbsService.notify.showSuccess();
          // that._initTree();
        }, (er) => {
          this._wbsService.notify.showError(r.errorMessage);
          event.node.node.value = event.oldValue;
        });

        that._wbsService.loading.hide();
      });
  }

  public treeNextLevelHandler(event: LoadNextLevelEvent) {
    const that = this;
    that._wbsService
      .getTreeItems(<number>event.node.id)
      .map(res => {
        const nSetting = Object.assign({}, that.nodeSettings);
        res.forEach(element => {
          nSetting.menuItems = this._getLevelMenu(element.level);
          element.settings = nSetting;
        });
        return res;
      })
      .subscribe(res => {
        event.node.setChildren(res);
        event.node.reloadChildren();

      });

  }

  protected selectedHandler(event) {
    this.currentLevel = <number>event.node.node.level;
    this.currentId = <number>event.node.node.id;
  }


  private _initTree() {
    const that = this;
    const nSetting = Object.assign({}, that.nodeSettings);

    that._wbsService
      .getTreeItems(null)
      .map((t: TreeModel[]) => {

        t.forEach(element => {
          nSetting.menuItems = this._getLevelMenu(element.level);
          element.settings = nSetting;
        });

        return t;
      })
      .subscribe((res: TreeModel[]) => {

        // that.tree = {
        //   value: 'شرکت نمونه',
        //   id: 0,
        //   children: res
        // };
        const p = that.structureModel[0].priorityNumber;
        nSetting.menuItems = this._getLevelMenu(p);
        const r = <TreeModel>{
          value: '------------',
          // settings: nSetting,
          children: []
        };
        if (res.length === 0) {
          const rr = Object.assign({}, r);
          rr.value = 'شرکت نمونه';
          res.push(rr);
        } else {
          r.value = 'شرکت نمونه';
        }
        r.children = res;
        that.tree = r;

        that._wbsService.loading.hide();
      });


  }

  private _getLevelMenu(priorityNumber: number): Array<NodeMenuItem> {
    let r = Array<NodeMenuItem>();
    this.structureModel.forEach(elem => {
      if (elem.priorityNumber >= priorityNumber) {
        r.push(<NodeMenuItem>{
          name: elem.name,
          cssClass: 'new-tag new-floor',
          action: NodeMenuItemAction.Custom,
          level: elem.priorityNumber
        });
      }
    });

    // switch (priorityNumber) {
    //   case 0:
    //     r = r.concat(this.ziroLeveMenu);
    //     r = r.concat(this.oneLeveMenu);
    //     r = r.concat(this.twoLeveMenu);
    //     r = r.concat(this.threeLeveMenu);
    //     r = r.concat(this.fourLeveMenu);
    //     break;
    //   case 1:
    //     r = r.concat(this.oneLeveMenu);
    //     r = r.concat(this.twoLeveMenu);
    //     r = r.concat(this.threeLeveMenu);
    //     r = r.concat(this.fourLeveMenu);
    //     break;
    //   case 2:
    //     r = r.concat(this.twoLeveMenu);
    //     r = r.concat(this.threeLeveMenu);
    //     r = r.concat(this.fourLeveMenu);
    //     break;
    //   case 3:
    //     r = r.concat(this.threeLeveMenu);
    //     r = r.concat(this.fourLeveMenu);
    //     break;
    //   case 4:
    //     r = r.concat(this.fourLeveMenu);
    //     break;
    // }


    r = r.concat(this.shareLeverMemu);
    return r;
  }
}
