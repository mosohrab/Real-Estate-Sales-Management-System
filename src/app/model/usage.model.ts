
export class UsageModel {

    usageId: number;
    usageName: string;

    
    public PreCode='u-';
}


export class UsageItemModel {
    usageItemId: number;
    usageItemName: string;
    usageId: number;
    usageName: string;
    measuringUnitId: number;
    measuringUnitName: string;

    public static PreCode='ui-';
}
