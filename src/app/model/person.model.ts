export interface PersonModel {

    personId: number;
    sex: boolean;
    aliasName: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    mobile: string;
    isMarried: boolean;

    // تابعیت
    citizenCountryId: number;
    // ملیت
    nationalityCountryId: number;
    // محل تولد
    birthProvinceId: string;
    // محل صدور شناسنامه
    birthCertificateCityId: number;
    // شماره شناسنامه
    birthCertificateId: string;
    // کد ملی
    nationalCode: string;

    // تاریخ تولد
    birthDate: string;
    attachmentFileType: string;
    // توضیحات
    description: string;

    workPhone: string;
    workAddress: string;
    // منطقه محل کار
    urbanAreaWork: string;


    homePhone: string;
    homeAddress: string;
    // منطقه محل زندگی
    urbanAreaHome: string;


}



export interface PersonStatusModel {
    personStatusId: number;
    personId: number;
    personFirstName: string;
    personLastName: string;
    personAliasName: string;
    statusId: number;
    statusName: number;
    statusValueId: number;
    statusValueName: number;
    moreStatusValue: string;

}
