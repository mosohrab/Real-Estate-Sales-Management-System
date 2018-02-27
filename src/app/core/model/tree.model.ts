
export interface TreeModel {
    value: string;
    id: any;
    parentId?: any;
    children: TreeModel[];
    hasChildren: boolean;
    level: number;
}

