import { BrowserModule } from '@angular/platform-browser';
import {
  LOCALE_ID, NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector, APP_INITIALIZER,
  ErrorHandler
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpModule, Http,
  RequestOptions, XHRBackend
} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import localeFa from '@angular/common/locales/fa';


// third party
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { TreeModule } from './ng2-tree/src/tree.module';
import { BusyModule } from 'angular2-busy';


// Kendo
import { RTL } from '@progress/kendo-angular-l10n';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CalendarModule } from '@progress/kendo-angular-dateinputs';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { TabStripModule } from '@progress/kendo-angular-layout';
/* Loading CLDR data */
import { load } from '@progress/kendo-angular-intl';
// load(
//     require('cldr-data/supplemental/likelySubtags.json'),
//     require('cldr-data/supplemental/currencyData.json'),
//     require('cldr-data/supplemental/weekData.json'),

//     require('cldr-data/main/es/numbers.json'),
//     require('cldr-data/main/es/currencies.json'),
//     require('cldr-data/main/es/dateFields.json'),
//     require('cldr-data/main/es/ca-gregorian.json'),
//     require('cldr-data/main/es/timeZoneNames.json')
// );

// Core
import { AryaNetCoreModule } from './core/core.module';
import { AppConfigService } from './core/services/app-config.service';
import { HttpInterceptedService } from './core/interceptors/http-interceptor.service';
import { AppErrorHandler } from './core/utils/error-handler';
// import { DeleteConfirmComponent } from './core/components/delete-confirm/delete-confirm.component';
// import { ToolbarButtonComponent } from './core/components/toolbar-button/toolbar-button.component';


import { AppRoutingModule } from './app-routing.module';
// // modules
// import { UnitModule } from './components/unit/unit.module';
// import { BuyerModule } from './components/buyer/buyer.module';
// import { WbsModule } from './components/wbs/wbs.module';


// // pipes
// import { JalaliPipe } from './pipes/jalali.pipe';


// Components
import { AppComponent } from './app.component';

import { CountryComboComponent } from './components/shared/country-combo/country-combo.component';
import { CountryUpsertComponent } from './components/base/country/country-upsert.component';
import { CityComponent } from './components/base/city/city.component';
import { CityDetailComponent } from './components/base/city/city-detail.component';
import { CountryComponent } from './components/base/country/country.component';
import { BuildingStructureTypeComponent } from './components/base/building-structure-type/building-structure-type.component';
import { BuildingStructureTypeComboComponent } from './components/base/building-structure-type/building-structure-type-combo.component';
import { CompanyTypeComponent } from './components/base/company-type/company-type.component';
import { ProvinceComponent } from './components/base/province/province.component';
import { ProvinceUpsertComponent } from './components/base/province/province-upsert.component';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BaseService } from './services/base.service';
import { WeBaseKendoGridService } from './services/base-kendo-grid.service';
import { CountryService, CountryComboService } from './services/country.service';
import { ProvinceService } from './services/province.service';
import { CityService, CityKendoGridService } from './services/city.service';
import { ProvinceComboComponent } from './components/shared/province-combo/province-combo.component';
import { ProvinceComboSingleComponent } from './components/shared/province-combo-single/province-combo-single.component';
import { CityComboSingleComponent } from './components/shared/city-combo-single/city-combo-single.component';
import { ScaleComboComponent } from './components/base/scale/scale-combo.component';
import { ScaleTypeComboComponent } from './components/base/scale/scale-type-combo.component';
import { ScaleUpsertComponent } from './components/base/scale/scale-upsert.component';
import { ScaleComponent } from './components/base/scale/scale.component';


import { SpecialStatusComponent } from './components/buyer/special-status/special-status.component';
import { SpecialStatusDialogComponent } from './components/buyer/special-status/special-status-dialog.component';
import { SpecialStatusValueComponent } from './components/buyer/special-status-value/special-status-value.component';
import { SpecialStatusValueUpsertComponent } from './components/buyer/special-status-value/special-status-value-upsert.component';
import { SpecialStatusComboComponent } from './components/buyer/special-status/special-status-combo.component';
import { SpecialStatusValueComboComponent } from './components/buyer/special-status-value/special-status-value-combo.component';
import { SpecialStatusValueGridComponent } from './components/buyer/special-status-value/special-status-value-grid.component';
import { PersonComponent } from './components/buyer/person/person.component';
import { PersonDialogComponent } from './components/buyer/person/person-dialog.component';
import { PersonDetailComponent } from './components/buyer/person/person-detail.component';
import { PersonSpecialStatusComponent } from './components/buyer/person/person-special-status.component';
import { CompanyTypeComboComponent } from './components/base/company-type/company-type-combo.component';
import { CompanyComponent } from './components/buyer/company/company.component';
import { CompanyDetailComponent } from './components/buyer/company/company-detail.component';
import { CompanyDialogComponent } from './components/buyer/company/company-dialog.component';
import { CompanySpecialStatusComponent } from './components/buyer/company/company-special-status.component';

import { WbsComponent } from './components/wbs/wbs/wbs.component';
import { WbsTreeComponent } from './components/wbs/wbs/wbs-tree.component';
import { WbsUpsertComponent } from './components/wbs/wbs/wbs-upsert.component';
import { WbsCompanyDetailComponent } from './components/wbs/wbs/company-detail.component';
import { WbsProjectDetailComponent } from './components/wbs/wbs/project-detail.component';
import { WbsPhaseDetailComponent } from './components/wbs/wbs/phase-detail.component';
import { WbsBlockDetailComponent } from './components/wbs/wbs/block-detail.component';
import { WbsFloorDetailComponent } from './components/wbs/wbs/floor-detail.component';

import { UnitComponent } from './components/unit/unit/unit.component';
import { UnitListComponent } from './components/unit/unit/unit-list.component';
import { UnitDetailComponent } from './components/unit/unit/unit-detail.component';
import { UnitFeatureAssignedComponent } from './components/unit/unit/unit-feature-assigned.component';
import { UnitFeatureAssignedUpsertComponent } from './components/unit/unit/unit-feature-assigned-upsert.component';

import { UsageComboComponent } from './components/unit/usage/usage-combo.component';
import { UsageItemComboSingleComponent } from './components/unit/usage-item/usage-item-combo-single.component';
import { FeatureComponent } from './components/unit/feature/feature.component';
import { FeatureComboComponent } from './components/unit/feature/feature-combo.component';
import { FeatureTitleUpsertComponent } from './components/unit/feature/feature-title-upsert.component';
import { FeatureTitleComboSingleComponent } from './components/unit/feature/feature-title-combo-single.component';
import { FeatureValueGridComponent } from './components/unit/feature/feature-value-grid.component';
import { FeatureValueUpsertComponent } from './components/unit/feature/feature-value-upsert.component';
import { FeatureValueComboSingleComponent } from './components/unit/feature/feature-value-combo-single.component';

import { MeasuringUnitComponent } from './components/unit/measuring-unit/measuring-unit.component';
import { UsageComponent } from './components/unit/usage/usage.component';



@NgModule({
  declarations: [
    // JalaliPipe,
    AppComponent,

    CountryComboComponent,
    CityComponent,
    CountryComponent,
    CountryUpsertComponent,
    BuildingStructureTypeComponent,
    BuildingStructureTypeComboComponent,
    CompanyTypeComponent,
    ProvinceComponent,
    ScaleComponent,
    ScaleComboComponent,
    ScaleTypeComboComponent,
    ScaleUpsertComponent,
    CityDetailComponent,
    ProvinceComboComponent,
    ProvinceComboSingleComponent,
    ProvinceUpsertComponent,
    CityComboSingleComponent,

    SpecialStatusComponent,
    SpecialStatusDialogComponent,
    SpecialStatusValueComponent,
    SpecialStatusValueUpsertComponent,
    SpecialStatusValueGridComponent,
    SpecialStatusComboComponent,
    SpecialStatusValueComboComponent,
    PersonComponent,
    PersonDialogComponent,
    PersonDetailComponent,
    PersonSpecialStatusComponent,
    CompanyTypeComboComponent,
    CompanyComponent,
    CompanyDetailComponent,
    CompanyDialogComponent,
    CompanySpecialStatusComponent,

    WbsComponent,
    WbsTreeComponent,
    WbsUpsertComponent,
    WbsCompanyDetailComponent,
    WbsProjectDetailComponent,
    WbsPhaseDetailComponent,
    WbsBlockDetailComponent,
    WbsFloorDetailComponent,

    UnitComponent,
    UnitListComponent,
    UnitDetailComponent,
    UnitFeatureAssignedComponent,
    UnitFeatureAssignedUpsertComponent,
    UsageComboComponent,
    UsageItemComboSingleComponent,
    FeatureComponent,
    FeatureComboComponent,
    FeatureTitleUpsertComponent,
    FeatureTitleComboSingleComponent,
    FeatureValueGridComponent,
    FeatureValueUpsertComponent,
    FeatureValueComboSingleComponent,
    UsageComponent,
    MeasuringUnitComponent
  ],
  imports: [
    AryaNetCoreModule,

    BrowserModule,
    FormsModule,
    HttpModule,

    NgbModule.forRoot(),
    SnotifyModule,
    // Ng4LoadingSpinnerModule,
    DpDatePickerModule,
    TreeModule,
    BusyModule,

    // Register the kendo modules
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    DialogModule,
    RippleModule,
    DateInputsModule,
    CalendarModule,
    PanelBarModule,
    TabStripModule,

    // BaseModule,
    // UnitModule,
    // BuyerModule,
    // WbsModule,

    AppRoutingModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    // { provide: LOCALE_ID, useValue: 'fa' },
    SnotifyService,

    BaseService,
    WeBaseKendoGridService,
    CountryService,
    ProvinceService,

    { provide: RTL, useValue: true },

    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      multi: true,
      deps: [AppConfigService]
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    // {
    //   provide: Http,
    //   useFactory: (backend: XHRBackend, options: RequestOptions) => {
    //     return new HttpInterceptedService(backend, options);
    //   },
    //   deps: [XHRBackend, RequestOptions],
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}







export function init(config: AppConfigService) {
  return () => {
    return config.load();
  };
}
