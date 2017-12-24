import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { BaseComponent } from '../base.component';
import { ToolbarButton, ToolbarButtonClickEvent } from '../../model/toolbar-button';

@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss'],
})
export class ToolbarButtonComponent extends BaseComponent {

  @Input() showAddButton: boolean;
  @Input() showEditButton: boolean;
  @Input() showDeleteButton: boolean;
  @Input() showDeletAlleButton: boolean;
  @Input() buttons = new Array<ToolbarButton>();


  @Output() addClicked = new EventEmitter<number>();
  @Output() editClicked = new EventEmitter<number>();
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() deleteAllClicked = new EventEmitter<number>();

  constructor() {
    super();
  }

  ngOnInitHandler() {
  }

  onAddClicked() {
    this.addClicked.emit();
  }

  onEditClicked() {
    this.editClicked.emit();
  }

  onDeleteClicked() {
    this.deleteClicked.emit();
  }

  onDeleteAllClicked() {
    this.deleteAllClicked.emit();
  }

  onBtnClick(toolbarButton: ToolbarButton) {
    toolbarButton.clicked(<ToolbarButtonClickEvent>{
    });
  }

}
