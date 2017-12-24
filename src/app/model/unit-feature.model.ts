
export interface UnitFeatureModel {
    unitFeatureId: number;
    featureName: string;
}


export interface UnitFeatureTitleModel {
    unitFeatureTitleId: number;
    canMoreSelect: boolean;
    featureId: number;
    featureTitleName: string;
    featureName: string;
}


export interface UnitFeatureValueModel {
    unitFeatureValueId: number;
    featureValue: string;
    featureTitleId: number;
    featureTitleName: string;
}
