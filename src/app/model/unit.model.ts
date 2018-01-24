


export interface UnitModel {
    wbsHid: number;
    wbsName: string;
    unitId: number;
    unitTitle: string; // عنوان واحد
    unitNumber: string; // شماره واحد
    nominalArea: number; // متراژ اسمی واحد
    isEnable: boolean;
    usageItemId: number;
    usageId: number;
}




export interface UnitFeatureAssignedModel {
    unitFeatureAssignedId: number;
    unitId: number;
    unitName: string;
    featureId: number;
    featureTitleId: number;
    featureTitleName: string;
    featureValueId: number;
    featureValueName: string;
}



export interface MeasuringUnitModel {
    measuringUnitId: number;
    measuringUnitName: string;
}

