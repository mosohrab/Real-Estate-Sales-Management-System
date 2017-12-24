// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



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


const routes: Routes = [
//   { path: 'home', component: WelcomeComponent },
//   { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }

{ path: 'country', component: CountryComponent },
{ path: 'city', component: CityComponent },
{ path: 'buildingstructuretype', component: BuildingStructureTypeComponent },
{ path: 'province', component: ProvinceComponent },
{ path: 'scale', component: ScaleComponent },

{ path: 'special', component: SpecialStatusComponent },
{ path: 'person', component: PersonComponent },
// { path: 'person/detail', component: PersonDetailComponent },
// { path: 'person/detail/:id', component: PersonDetailComponent },
// { path: 'person/detail/:id/special', component: PersonSpecialStatusComponent },
{ path: 'company', component: CompanyComponent },
// { path: 'company/detail', component: CompanyDetailComponent },
// { path: 'company/detail/:id', component: CompanyDetailComponent },
// { path: 'company/detail/:id/special', component: CompanySpecialStatusComponent },


{ path: 'wbs', component: WbsComponent },


{ path: 'unit', component: UnitComponent },
{ path: 'unitfeature', component: FeatureComponent },
{ path: 'measuringunit', component: MeasuringUnitComponent },
{ path: 'unitusage', component: UsageComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




