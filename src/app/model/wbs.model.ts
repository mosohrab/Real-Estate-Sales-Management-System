

export interface WbsStructureModel {
    hId: number;
    priorityNumber: number;
    name: string;
    isEnable: boolean;
}


export interface WbsModel {
    wbsHid: number;
    parentWbsHid: number;
    name: string;
    level: number;
    structureHid: number;
}


export interface WbsCompanyModel {
    wbsHid: number;
    wbsName: string;
    companyId: number;
    companyTypeId: number;
    companyName: string;
    // نام اختصاری
    companyAbbreviation: string;
    registrationDate: any;
    registrationNumber: string;
    // کد اقتصادی
    economicCode: string;
    // شناسیه ملی
    nationalIdCode: string;
    // زمینه فعالیت
    subjectActivity: string;
    description: string;
    phoneNumber1: string;
    phoneNumber2: string;
    faxNumber: string;
    // شناسه ارزش افزوده
    valueAddedId: string;
    webSite: string;
    provinceId: number;
    provinceName: string;
    countryId: number;
    countryName: string;
    cityId: number;
    cityName: string;
    // ملیت
    nationalityCountryId: number;
    centralOfficeAddress: string;
}


export interface WbsProjectModel {
    projectId: number;
    wbsHid: number;
    wbsName: string;
    projectName: string;
    registrationPlaqueNumber: string;
    provinceId: number;
    countryId: number;
    cityId: number;
    projectAddress: string;
    phoneNumber1: string;
    phoneNumber2: string;
    faxNumber: string;
    landArea: string;
    foundationArea: string;
    usefulArea: string;
    startBuildDate: any;
    licenseNumber: string;
    webSite: string;
    enable: boolean;
    description: string;
    usageId: number;
    usageItemId: number;
    buildingStructureType: number;
}


export interface WbsPhaseModel {
    phaseId: number;
    wbsHid: number;
    wbsName: string;
    phaseName: string;
    description: string;
    isEnable: boolean;
    phasePosition: string;
    landAreaAllocated: string;
    phaseFoundation: string;
    useFulAreaPhase: string;
    startBuildDate: any;
    usageItemId: number;
    usageId: number;
    buildingStructureType: number;
}



export interface WbsBlockModel {
    blockId: number;
    wbsHid: number;
    wbsName: string;
    fullBlockName: string; // نام بلوک
    blockPosition: string; // موقعیت بلوک
    landAreaAllocated: string; // مساحت زمین تخصیص یافته به بلوک
    blockFoundation: string; // زیربنای بلوک
    useFulAreaBlock: string; // مساحت مفید بلوک
    usageItemId: number; // کد خارجی، نوع کاربری بلوک
    usageId: number; // کد خارجی، نوع کاربری بلوک
    buildingStructureType: number; // کد خارجی، نوع سازه بلوک
    startBuildDate: any; // تاریخ شروع ساخت بلوک
    floorsNumber: number; // تعداد طبقات بلوک
    unitCount: number; // تعداد واحدهای بلوک
    parkingNumber: number; // تعداد پارکینگ های بلوک
    warehouseCount: number; // تعداد انباری های بلوک
    elevatorCount: number; // تعداد آسانسورهای بلوک
    escalatorCount: number; // تعداد پله برقی های بلوک
    isEnable: string;
    description: string;

}



export interface WbsFloorModel {
    floorId: number;
    wbsHid: number;
    wbsName: string;
    fullFloorName: string; // نام طبقه
    floorArea: string; // مساحت طبقه
    useFulAreaFloor: string; // مساحت مفید طبقه
    usageItemId: number; // کد خارجی، نوع کاربری بلوک
    usageId: number; // کد خارجی، نوع کاربری بلوک
    floorCount: number; // تعداد طبقه
    description: string;



}

