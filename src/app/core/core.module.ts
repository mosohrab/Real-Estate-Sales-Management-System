
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { ToolbarButtonComponent } from './components/toolbar-button/toolbar-button.component';

import { BaseService } from './services/base.service';
import { BaseKendoGridService } from './services/base-kendo-grid.service';
import { BaseKendoGridComponent } from './components/base-kendo-grid.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    // CommonModule
  ],
  declarations: [

    // DeleteConfirmComponent,
    ToolbarButtonComponent
  ],
  providers: [
    BaseService,
    BaseKendoGridService
  ],
  exports: [
    ToolbarButtonComponent
  ]

})
export class AryaNetCoreModule {

}

