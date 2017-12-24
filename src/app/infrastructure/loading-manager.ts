import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';


@Injectable()
export class LoadingManager {
    static _loadingManager: LoadingManager;
    // loading: Ng4LoadingSpinnerService;
    busyConfig: any;

    constructor() {
        // this.loading = AppModule.injector.get(Ng4LoadingSpinnerService);

    }

    static createInstance(): LoadingManager {
        if (this._loadingManager == null) {
            this._loadingManager = new LoadingManager();

        }
        return this._loadingManager;
    }


    initBusyConfig(busyConfig) {
        this.busyConfig = busyConfig;
    }

    show() {
        // this.loading.show();
        //     this.showBusy = true;
        this._showBusyLoading();
    }

    hide() {
        //  this.loading.hide();
        this._hideBusyLoading();
    }




    private _showBusyLoading() {
        if (this.busyConfig !== undefined &&
            this.busyConfig.busy !== undefined) {
            this.busyConfig.busy = true;
        }
    }

    private _hideBusyLoading() {
        if (this.busyConfig !== undefined &&
            this.busyConfig.busy !== undefined) {
            this.busyConfig.busy = false;
        }
    }



    // startLoadingSpinner() {
    //     //  this.loading.show();
    //     setTimeout(function () {
    //         this.ng4LoadingSpinnerService.hide();
    //     }.bind(this), 4000);
    // }

}
