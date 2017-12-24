export enum NodeMenuItemAction {
  NewFolder,
  NewTag,
  Rename,
  Remove,
  // NewCompany,
  // NewProject,
  // NewPhase,
  Custom
}

export enum NodeMenuAction {
  Close
}

export interface NodeMenuEvent {
  sender: HTMLElement;
  action: NodeMenuAction;
}

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction;
  level?: number;
  // postAction?: any;
}
