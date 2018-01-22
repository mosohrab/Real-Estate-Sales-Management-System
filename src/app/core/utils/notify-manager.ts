import { Injectable } from '@angular/core';

import { SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { AppModule } from '../../app.module';


@Injectable()
export class NotifyManager {
    private static _notifyManager: NotifyManager;
    private notifyService: SnotifyService;
    private t: number | undefined = 2000;
    private notifyConfig: SnotifyToastConfig = {
        position: 'rightTop',
        timeout: this.t,
        buttons: <any[]>[],
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        backdrop: -1,
        // icon: 'assets/custom-svg.svg',

    };
    constructor() {
        this.notifyService = AppModule.injector.get(SnotifyService);
    }

    static createInstance(): NotifyManager {
        if (this._notifyManager == null) {
            this._notifyManager = new NotifyManager();

        }
        return this._notifyManager;
    }


    showSuccess(message?: string) {
        this.notifyService.clear();

        this.notifyService.success(message || 'عملیات با موفقیت انجام گردید', '', this.notifyConfig);

    }

    showError(message?: string) {
        this.notifyService.clear();

        this.notifyService.error(message || 'خطایی در اجرای عملیات رخ داده', '',
            this.notifyConfig);

    }
    showWarning(message?: string) {
        this.notifyService.clear();

        this.notifyService.warning(message || 'خطایی در اجرای عملیات رخ داده', '', this.notifyConfig);

    }

    showDeleteConfirm(okAction: any, body?: string, title?: string) {
        this.notifyService.clear();

        const config = Object.assign({}, this.notifyConfig);
        const that = this;
        config.position = 'centerCenter';
        config.closeOnClick = false;
        config.showProgressBar = false;
        config.backdrop = 1;
        config.timeout = undefined;

        config.buttons = [
            {
                text: 'تایید',
                action: (toast) => {
                    if (okAction) {
                        setTimeout(() => {
                            okAction();
                            that.notifyService.clear();
                        }, 500);
                    }
                    this.notifyService.remove(toast.id);

                },
                bold: true
            },
            {
                text: 'انصراف',
                action: (toast) => {
                    this.notifyService.remove(toast.id);
                },
                bold: false
            },
        ];

        this.notifyService.confirm(
            body || 'آیا از حذف رکورد(ها) انتخابی اطمینان دارید؟',
            title || 'حذف',
            config);

    }

}
