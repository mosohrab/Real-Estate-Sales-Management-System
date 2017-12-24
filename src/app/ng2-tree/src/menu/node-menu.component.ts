import {
  Component, EventEmitter,
  Input, Output, Inject, OnDestroy, OnInit, ViewChild, Renderer2
} from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import {
  NodeMenuItemSelectedEvent,
  NodeMenuItemAction,
  NodeMenuAction
} from './menu.events';
import { NodeEvent } from '../tree.events';
import { isLeftButtonClicked, isEscapePressed } from '../utils/event.utils';

@Component({
  selector: 'node-menu',
  template: `
    <div class="node-menu">
      <ul class="node-menu-content" #menuContainer>
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
})
export class NodeMenuComponent implements OnInit, OnDestroy {
  @Output()
  public menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter<NodeMenuItemSelectedEvent>();

  @ViewChild('menuContainer') public menuContainer: any;

  @Input() menuItems: NodeMenuItem[];

  public availableMenuItems: NodeMenuItem[];

  private disposersForGlobalListeners: Function[] = [];

  public constructor( @Inject(Renderer2) private renderer: Renderer2,
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService) {
  }

  public ngOnInit(): void {

    this.availableMenuItems = this.menuItems || [
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

    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  public onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void {

    if (isLeftButtonClicked(e)) {

      if (selectedMenuItem.preExecute)
        selectedMenuItem.preExecute({
          nodeMenuItemAction: selectedMenuItem.action,
          level: selectedMenuItem.level
        });
      // if (selectedMenuItem.action == NodeMenuItemAction.Custom) {
      //   if (selectedMenuItem.execute) {
      //     selectedMenuItem.execute(selectedMenuItem,
      //       {
      //         nodeMenuItemAction: selectedMenuItem.action,
      //         level: selectedMenuItem.level
      //       }
      //     );
      //   }
      // }
       else {
        this.menuItemSelected.emit({
          nodeMenuItemAction: selectedMenuItem.action,
          level: selectedMenuItem.level
          // ,postAction :selectedMenuItem.postExecute 
        });
      }

      this.nodeMenuService.fireMenuEvent(e.target as HTMLElement, NodeMenuAction.Close);

      // if (selectedMenuItem.postExecute)
      //   selectedMenuItem.postExecute({ nodeMenuItemAction: selectedMenuItem.action });

    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    // Check if the click is fired on an element inside a menu
    const containingTarget = (this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target));

    if (mouseClicked && !containingTarget || isEscapePressed(e as KeyboardEvent)) {
      this.nodeMenuService.fireMenuEvent(e.target as HTMLElement, NodeMenuAction.Close);
    }
  }
}

export interface NodeMenuItem {
  name: string;
  level?: number;
  action: NodeMenuItemAction;
  cssClass: string;
  execute?: (node: any, menu: NodeMenuItemSelectedEvent) => {};
  preExecute?: (_: NodeMenuItemSelectedEvent) => {};
  // postExecute?: (_: NodeEvent) => {};
  postExecute?: any;
}
