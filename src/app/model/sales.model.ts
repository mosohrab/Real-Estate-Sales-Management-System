
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

