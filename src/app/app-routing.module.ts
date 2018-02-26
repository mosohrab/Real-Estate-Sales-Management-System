// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RootComponent } from './app.component';
import { CityComponent } from './components/base/city/city.component';
import { CountryComponent } from './components/base/country/country.component';
import { BuildingStructureTypeComponent } from './components/base/building-structure-type/building-structure-type.component';
import { CompanyTypeComponent } from './components/base/company-type/company-type.component';
import { ProvinceComponent } from './components/base/province/province.component';
import { ScaleComponent } from './components/base/scale/scale.component';

import { SpecialStatusComponent } from './components/buyer/special-status/special-status.component';
import { PersonComponent } from './components/buyer/person/person.component';
// import { PersonDetailComponent } from './components/buyer/person-detail/person-detail.component';
// import { PersonSpecialStatusComponent } from './components/buyer/person-special-status/person-special-status.component';
import { CompanyComponent } from './components/buyer/company/company.component';
// import { CompanyDetailComponent } from './components/buyer/company-detail/company-detail.component';
// import { CompanySpecialStatusComponent } from './components/buyer/company-special-status/company-special-status.component';

import { WbsComponent } from './components/wbs/wbs/wbs.component';


import { UnitComponent } from './components/unit/unit/unit.component';
import { FeatureComponent } from './components/unit/feature/feature.component';
import { MeasuringUnitComponent } from './components/unit/measuring-unit/measuring-unit.component';
import { UsageComponent } from './components/unit/usage/usage.component';
import { CountryComboComponent } from './components/shared/country-combo/country-combo.component';

import { SalesPlanComponent } from './components/sales/sales-plan/sales-plan.component';
import { SalesPlanStatusComponent } from './components/sales/sales-plan-status/sales-plan-status.component';


const routes: Routes = [
  //   { path: 'home', component: WelcomeComponent },
  //   { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
  //   { path: '', redirectTo: 'home', pathMatch: 'full' },
  //   { path: '**', component: PageNotFoundComponent }

  // {
  //   path: 'base',
  //   component: AppComponent,
  //   children: [
  //     { path: 'country', component: CountryComponent },
  //     { path: 'city', component: CityComponent },
  //     { path: 'buildingstructuretype', component: BuildingStructureTypeComponent },
  //     { path: 'province', component: ProvinceComponent },
  //     { path: 'scale', component: ScaleComponent },
  //   ]
  // },

  {
    // path: '',
    // component: LoginComponent,
    // children: [
    //   {
        path: '',
        component: RootComponent,
        children: [
          {
            path: 'base',
            component: RootComponent,
            data: {
              breadcrumb: 'اطلاعات پایه'
            },
            children: [
              {
                path: 'country',
                component: CountryComponent,
                data: {
                  breadcrumb: 'کشور'
                }
              },
              {
                path: 'province',
                component: CityComponent,
                data: {
                  breadcrumb: 'استان'
                }
              },
              {
                path: 'city',
                component: CityComponent,
                data: {
                  breadcrumb: 'شهر'
                }
              },
              {
                path: 'buildingstructuretype',
                component: CityComponent,
                data: {
                  breadcrumb: 'نوع سازه'
                }
              },
              {
                path: 'scale',
                component: CityComponent,
                data: {
                  breadcrumb: 'مقیاس'
                }
              },
            ],
          }, // end base

          {
            path: 'buyer',
            component: RootComponent,
            data: { breadcrumb: 'خریداران' },
            children: [
              {
                path: 'special', component: SpecialStatusComponent,
                data: { breadcrumb: 'ویژگی ها' }
              },

              {
                path: 'person', component: PersonComponent,
                data: { breadcrumb: 'اشخاص حقیقی' }
              },
              // { path: 'person/detail', component: PersonDetailComponent },
              // { path: 'person/detail/:id', component: PersonDetailComponent },
              // { path: 'person/detail/:id/special', component: PersonSpecialStatusComponent },

              {
                path: 'company', component: CompanyComponent,
                data: { breadcrumb: 'اشخاص حقوقی' },
              },
              // { path: 'company/detail', component: CompanyDetailComponent },
              // { path: 'company/detail/:id', component: CompanyDetailComponent },
              // { path: 'company/detail/:id/special', component: CompanySpecialStatusComponent },

            ],

          }, // end

          {
            path: 'wbs',
            component: RootComponent,
            data: { breadcrumb: 'ساختار شکست' },
            children: [
              {
                path: 'wbs', component: WbsComponent,
                data: { breadcrumb: 'ساختار شکست' }
              },
            ]
          }, // end

          {
            path: 'unit',
            component: RootComponent,
            data: { breadcrumb: ' واحد ها' },
            children: [
              {
                path: 'unit', component: UnitComponent,
                data: { breadcrumb: 'تعریف واحدها' }
              },

              {
                path: 'feature', component: FeatureComponent,
                data: { breadcrumb: 'ویژگیهای عمومی و انتخابی' }
              },

              {
                path: 'measuringunit', component: MeasuringUnitComponent,
                data: { breadcrumb: 'واحد سنجش' }
              },

              {
                path: 'usage', component: UsageComponent,
                data: { breadcrumb: 'کاربری واحد' }
              },
            ]
          }, // end

          {
            path: 'sales',
            component: RootComponent,
            data: { breadcrumb: 'فروش' },
            children: [
              {
                path: 'planstatus', component: SalesPlanStatusComponent,
                data: { breadcrumb: 'وضعیت طرح و فروش' }
              },
              {
                path: 'plan', component: SalesPlanComponent,
                data: { breadcrumb: 'طرح فروش' }
              },

              // {
              //   path: 'feature', component: FeatureComponent,
              //   data: { breadcrumb: 'ویژگیهای عمومی و انتخابی' }
              // },


            ]
          }, // end


        ]
    //   }
    // ]


    
  },



  // { path: 'base/country', component: CountryComponent },
  // { path: 'base/city', component: CityComponent },
  // { path: 'base/buildingstructuretype', component: BuildingStructureTypeComponent },
  // { path: 'base/province', component: ProvinceComponent },
  // { path: 'base/scale', component: ScaleComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




