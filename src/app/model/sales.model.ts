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


export interface PersonExceptionModel {
    personExceptionId: number;
    personId: number;
    personFullName: string;
    salesPlanId: number;
    salesPlanTitle: string;
    hasPermmision: boolean;
}
export interface PersonExceptionBulkModel {
    personIds: number[];
    hasPermmision: boolean;
}



export interface BuyerRangeBulkModel {
    statusValueId: number[];
    hasPermmision: boolean;
}


export interface BuyerRangeModel {
    buyerRangeId: number;
    statusValueId: number;
    statusValueName: string;
    salesPlanId: number;
    salesPlanTitle: string;
    hasPermmision: boolean;
}


export enum PersonBundlingType {
    specialStatusValue = 0,
    exception = 1
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




