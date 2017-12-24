

export interface CompanyTypeModel {
    companyTypeId: number;
    companyTypeName: string;
}

export interface CompanyModel {

    companyId: number;
    companyTypeId: number;
    companyName: string;
    // نام اختصاری
    companyAbbreviation: string;
    registrationDate: any;
    registrationNumber: string;
    registrationPlace: string;
    // کد اقتصادی
    economicCode: string;
    // شناسیه ملی
    nationalIdCode: string;
    email: string;
    description: string;
    phoneNumber1: string;
    phoneNumber2: string;
    urbanArea: number;
    // شناسه ارزش افزوده
    valueAddedId: string;
    webSite: string;
    // تابعیت
    citizenCountryId: number;
    // ملیت
    nationalityCountryId: number;
    attachmentFileType: string;
    centralOfficeAddress: string;
}


export interface CompanyStatusModel {
    companyStatusId: number;
    companyId: number;
    companyName: string;
    statusId: number;
    statusName: number;
    statusValueId: number;
    statusValueName: number;
    moreStatusValue: string;

}
