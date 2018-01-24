
import {
  Component, OnInit,
  ViewChild,
  Input, Output,
  EventEmitter, ViewEncapsulation
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
import { debug } from 'util';

@Component({
  selector: 'app-wbs-tree',
  templateUrl: './wbs-tree.component.html',
  styleUrls: ['./wbs-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WbsTreeComponent extends WeBaseTreeComponent {
  _wbsService: WbsService;
  _structureService: WbsStructureService;
  currentLevel: number;
  currentId: number;
  structureModel = Array<WbsStructureModel>();

  @Input() enableNodeSetting = true;
  @Output() nodeCreatedHandler = new EventEmitter<NodeCreatedEvent>();
  @Output() nodeRemovedHandler = new EventEmitter<NodeRemovedEvent>();
  @Output() nodeRenamedHandler = new EventEmitter<NodeRenamedEvent>();
  @Output() nodeSelectedHandler = new EventEmitter<NodeSelectedEvent>();

  public tree: TreeModel;

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


  constructor(service: WbsService, structureService: WbsStructureService) {
    super();

    this.nodeSettings.rightMenu = this.enableNodeSetting;
    this.nodeSettings.leftMenu = this.enableNodeSetting;

    this._wbsService = service;
    this._structureService = structureService;

  }

  ngOnInitHandler() {
    const that = this;
    this._wbsService.initBusyConfig(this.busyConfig);

    this._structureService.getAllItems()
      .subscribe((res: Array<WbsStructureModel>) => {
        that.structureModel = res;
        that._initTree();
      });

  }


  protected createdHandler(event: NodeCreatedEvent) {
    this.nodeCreatedHandler.emit(event);
  }


  protected removedHandler(event: NodeRemovedEvent) {
    this.nodeRemovedHandler.emit(event);
  }
  protected renamedHandler(event: NodeRenamedEvent) {
    this.nodeRenamedHandler.emit(event);
  }

  public treeNextLevelHandler(event: LoadNextLevelEvent) {
    const that = this;
    this._wbsService.loading.show();
    that._wbsService
      .getTreeItems(<number>event.node.id)
      .map(res => {

        if (that.enableNodeSetting) {
          const nSetting = Object.assign({}, that.nodeSettings);
          res.forEach(element => {
            nSetting.menuItems = this._getLevelMenu(element.level);
            element.settings = nSetting;
          });
        }

        return res;
      })
      .subscribe(res => {
        event.node.setChildren(res);
        event.node.reloadChildren();
        that._wbsService.loading.hide();
      });

  }

  protected selectedHandler(event: NodeSelectedEvent) {
    this.currentLevel = <number>event.node.node.level;
    this.currentId = <number>event.node.node.id;
    this.nodeSelectedHandler.emit(event);
  }


  private _initTree() {
    const that = this;
    const nSetting = Object.assign({}, that.nodeSettings);
    that._wbsService
      .getTreeItems(null)
      .map((t: TreeModel[]) => {

        if (that.enableNodeSetting) {
          t.forEach(element => {
            nSetting.menuItems = this._getLevelMenu(element.level);
            element.settings = nSetting;
          });
        }

        return t;
      })
      .subscribe((res: TreeModel[]) => {
        const p = that.structureModel[0].priorityNumber;

        if (that.enableNodeSetting) {
          nSetting.menuItems = this._getLevelMenu(p);
        }

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

      });


  }

  private _getLevelMenu(priorityNumber: number): Array<NodeMenuItem> {
    if (this.enableNodeSetting === false) {
      return [];
    }

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
    r = r.concat(this.shareLeverMemu);
    return r;
  }
}
