
export interface UsageModel {

    usageId: number;
    usageName: string;
}


export interface UsageItemModel {
    usageItemId: number;
    usageItemName: string;
    usageId: number;
    usageName: string;
    measuringUnitId: number;
    measuringUnitName: string;
}
