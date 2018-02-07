
export interface TreeModel {
    value: string;
    id: number;
    parentId?: number;
    children: TreeModel[];
    hasChildren: boolean;
    level: number;
}

