import { PersonType } from './person.model';

export interface SalesPlanModel {
    salesPlanId: number;
    bundlingType: boolean;
    number: string;
    endDate: any;
    startDate: any;
    title: string;
    description: string;
    basedOnListValuation: boolean;
    anAgreementValuation: boolean;
    salesPlanStatusTitle: string;
    salesPlanStatusId: number;
}


export interface SalesPlanStatusModel {
    salesPlanStatusId: number;
    title: string;
    description: string;
}


// export interface PersonExceptionModel {
//     personExceptionId: number;
//     personId: number;
//     personFullName: string;
//     salesPlanId: number;
//     salesPlanTitle: string;
//     hasPermmision: boolean;
// }
// export interface PersonExceptionBulkModel {
//     personIds: number[];
//     hasPermmision: boolean;
// }



export interface BuyerRangeBulkModel {
    buyerRange: BuyerRangeModel;
    buyerRangeValues: BuyerRangeValueModel[];

}

export interface BuyerRangeAggregateModel {
    buyerRangeBulks: BuyerRangeBulkModel[];

}


export interface BuyerRangeModel {
    buyerRangeId: number;
    salesPlanId: number;
    salesPlanTitle: string;
    fillterType: PersonBundlingType;
    isSelectAll: boolean;
}

export interface BuyerRangeValueModel {
    buyerRangeValueId: number;
    buyerRangeId: number;
    personId?: number;
    personName: string;
    companyId?: number;
    companyName: string;
    specialStatusValueId?: number;
    specialStatusValueName: string;
    hasPermission: boolean;
}


export enum PersonBundlingType {
    PersonAndCompany = 0,
    Person = 1,
    Company = 2
}

export interface PersonBundlingModel {
    personBundlingId: number;
    personBundlingType: PersonBundlingType;
    personType: PersonType;
    valueId: number;
    name: string;
    salesPlanId: number;
    salesPlanTitle: string;
    hasPermmision: boolean;
}







export interface UnitRangeFilterModel {
    usageItemId: number;
    featureValueId: number;
    area: number;
    wbsUnitId: number[];

}

export interface UnitRangeModel {
    unitRangeId: number;
    salesPlanId: number;
    unitId: number;
    unitTitle: string;
    salesPlanTitle: string;
}

export interface UnitRangeBulkModel {
    salesPlanId: number;
    unitId: number[];
}


export interface UnitBundlingFilterAreaModel {

    fromArea: number;
    toArea: number;
    usageItemId: number;
}


export interface UnitBundlingFilterModel {

    areaModel: UnitBundlingFilterAreaModel[];
    usageItemsIds: number[];
    featureIds: number[];
    selectiveFeatureIds: number[];
}




