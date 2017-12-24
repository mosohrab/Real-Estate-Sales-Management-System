
export interface SpecialStatusModel {
    specialStatusId: number;
    name: string;
    // نوع وضعیت خاص
    statusType?: boolean;
    // امکان انتخاب بیشتر
    canMoreSelect: boolean;


}

export interface SpecialStatusValueModel {
    specialStatusValueId: number;
    specialStatusId: number;
    specialStatusName: string;
    name: string;
    descreption: string;
    // سایر مقادیر
    haveMoreDetial: boolean;

    // عنوان سایر مقادیر
    moreSpecialStatusLable: string;

    // مقیاس
    scaleId: number;

}

