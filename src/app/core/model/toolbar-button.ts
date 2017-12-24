
import { EventEmitter } from '@angular/core';

// tslint:disable-next-line:no-empty-interface
export interface ToolbarButtonClickEvent {

    resutl: boolean;
}

export interface ToolbarButton {
    icon: string;
    tooltip: string;
    title: string;
    // clickAction: (_: ToolbarButtonClickEvent) => {};
    // clickAction: EventEmitter<ToolbarButtonClickEvent>;

    clicked?: (event: ToolbarButtonClickEvent) => {};

}
