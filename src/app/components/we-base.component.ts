
import {
  Component, OnInit,
  Input, Output, SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../core/components/base.component';

import { Tree } from '../ng2-tree/src/tree';
import { TreeModel, TreeModelSettings } from '../ng2-tree/src/tree.types';
import {
  LoadNextLevelEvent,
  NodeSelectedEvent,
  NodeRemovedEvent,
  NodeCollapsedEvent,
  NodeCreatedEvent,
  NodeExpandedEvent,
  NodeMovedEvent
} from '../ng2-tree/src/tree.events';
import {
  NodeMenuItemSelectedEvent,
  NodeMenuItemAction,
  NodeMenuAction
} from '../ng2-tree/src/menu/menu.events';
import { NodeMenuItem } from '../ng2-tree/src/menu/node-menu.component';

import { BaseService } from '../services/base.service';

export abstract class WeBaseComponent extends BaseComponent {

  // busyLoading: Promise<any>;
  // showBusy = false;
  busyConfig = {
    busy: false,
    message: 'Loading...',
    backdrop: true,
    delay: 0,
    minDuration: 1000
  };

}


export abstract class WeBaseTreeComponent extends WeBaseComponent {

  treeSettings = {
    rootIsVisible: true
  };


  defaultMenuItems: NodeMenuItem[] = [
    {
      name: 'New tag',
      action: NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    },
    {
      name: 'New folder',
      action: NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder'
    },
    {
      name: 'Rename',
      action: NodeMenuItemAction.Rename,
      cssClass: 'rename'
    },
    {
      name: 'Remove',
      action: NodeMenuItemAction.Remove,
      cssClass: 'remove'
    }
  ];

  nodeSettings = <TreeModelSettings>{
    'static': false,
    'rightMenu': true,
    'leftMenu': true,
    'cssClasses': {
      'expanded': 'fa fa-caret-down fa-lg',
      'collapsed': 'fa fa-caret-right fa-lg',
      'leaf': 'fa fa-lg',
      'empty': 'fa fa-caret-right disabled'
    },
    'templates': {
      'node': '<i class="fa fa-folder-o fa-lg"></i>',
      'leaf': '<i class="fa fa-file-o fa-lg"></i>',
      'leftMenu': '<i class="fa fa-navicon fa-lg"></i>',
    },
    // 'menuItems': [
    //   {
    //     name: 'New Model',
    //     action: NodeMenuItemAction.NewTag,
    //     cssClass: 'new-tag',
    //     preExecute: function (event: NodeMenuItemSelectedEvent) {
    //       //  console.log(tree)
    //     },
    //     postExecute: function (event: NodeMenuItemSelectedEvent) {
    //       //  console.log(tree)
    //     }
    //   },
    //   {
    //     name: 'New Model',
    //     action: NodeMenuItemAction.Custom,
    //     cssClass: 'new-tag',
    //     execute: function (event: NodeMenuItemSelectedEvent) {
    //       //  console.log(tree)
    //     }
    //   },
    //   {
    //     name: 'Custom Menu Item',
    //     action: NodeMenuItemAction.Custom,
    //     cssClass: 'custom-menu-item',
    //     execute: function (event: NodeMenuItemSelectedEvent) {
    //       //  console.log(tree)
    //     }
    //   }
    // ]

  };

  abstract ngOnInitHandler();


  protected removedHandler(event: NodeRemovedEvent) { }
  public onRemoved(event: NodeRemovedEvent) {
    this.removedHandler(event);
  }


  protected renamedHandler(event) { }
  public onRenamed(event) {
    this.renamedHandler(event);
  }


  protected selectedHandler(event: NodeSelectedEvent) { }
  public onSelected(event: NodeSelectedEvent) {
    this.selectedHandler(event);
  }


  protected movedHandler(event: NodeMovedEvent) { }
  public onMoved(event: NodeMovedEvent) {
    this.movedHandler(event);
  }


  protected createdHandler(event: NodeCreatedEvent) { }
  public onCreated(event: NodeCreatedEvent) {
    this.createdHandler(event);
  }


  protected expandedHandler(event: NodeExpandedEvent) { }
  public onExpanded(event: NodeExpandedEvent) {
    this.expandedHandler(event);
  }

  protected collapsedHandler(event: NodeCollapsedEvent) { }
  public onCollapsed(event: NodeCollapsedEvent) {
    this.collapsedHandler(event);
  }

  public abstract treeNextLevelHandler(event: LoadNextLevelEvent);
  public onNextLevel(event: LoadNextLevelEvent) {
    this.treeNextLevelHandler(event);
  }

}



// export abstract class BaseControlValueAccessor extends WeBaseComponent
//   implements ControlValueAccessor {

//   // ngOnInitHandler() { }
//   // ngOnInit() {
//   //   this.ngOnInitHandler();
//   // }



//   abstract writeValue(obj: any): void;

//   registerOnChange(fn: any): void {
//     this.propagateChange = fn;
//   }
//   registerOnTouched(fn: any): void {

//   }
//   setDisabledState?(isDisabled: boolean): void {

//   }

//   propagateChange = (_: any) => { };


// }



// export abstract class BaseComboComponent
//   // <TModel, TService extends BaseService>
//   extends BaseControlValueAccessor {

//   @Input() selectedId: number;
//   @Output() valueChanged = new EventEmitter<any[]>();
//   @Input() autoBound = true;
//   service: any;

//   constructor() {
//     super();

//   }

//   abstract ngOnInitHandler();

//   public clear(): void {
//     this.selectedId = null;

//   }


//   public onValueChange(value: any): void {
//     this.propagateChange(value);
//     this.valueChanged.emit(value);
//   }

//   public onSelectionChange(value: any): void {
//     //  this.log("selectionChange", value);
//   }

//   public onFilterChange(filter: any): void {
//     // this.log("filterChange", filter);
//     // this.data = this.source.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
//   }

//   public onOpen(): void {
//     //   this.log("open");
//   }

//   public onClose(): void {
//     //  this.log("close");
//   }

//   public onFocus(): void {
//     //   this.log("focus");
//   }

//   public onBlur(): void {
//     //  this.log("blur");
//   }



//   writeValue(obj: any): void {
//     if (obj) {
//       this.selectedId = obj;
//       this.onValueChange(obj);
//     }
//   }


// }
