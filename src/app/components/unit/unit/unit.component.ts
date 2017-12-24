
import {
  Component, OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  LoadNextLevelEvent,
  NodeSelectedEvent,
  NodeRemovedEvent,
  NodeCollapsedEvent,
  NodeCreatedEvent,
  NodeExpandedEvent,
  NodeMovedEvent,
  NodeEvent
} from '../../../ng2-tree/src/tree.events';

import { BaseComponent, BaseTreeComponent } from '../../shared/base.component';
import { WbsStructureService, WbsService } from '../../../services/wbs.service';
import { WbsModel } from '../../../model/wbs.model';
import { UnitListComponent } from './unit-list.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  providers: [
    WbsService,
    WbsStructureService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UnitComponent extends BaseComponent {

  private _wbsService: WbsService;
  currentLevel: number;
  currentId: number;
  @ViewChild('unitList') unitList: UnitListComponent;
  constructor(service: WbsService) {
    super();
    this._wbsService = service;

  }

  ngOnInitHandler() {
    const that = this;
    //  that._service.readGrid();
  }


  protected onCreatedNode(event: NodeCreatedEvent) {
  }


  protected onSelectedNode(event: NodeSelectedEvent) {

    this.currentLevel = event.node.node.level;
    this.currentId = <number>event.node.node.id;
    this.unitList.initUnits(this.currentId);
  }


}
