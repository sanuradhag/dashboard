import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {Routes, RouterModule} from "@angular/router";

import {SearchService} from "./services/app.search.service";
import {AppMain} from "./components/app-main/app-main";
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppSidebarPanelComponent} from './components/app-sidebar-panel/app-sidebar-panel.component';
import {AppSearchTermBuilder} from "./components/search/app-search-term-builder/app-search-term-builder.component";
import {AppSearch} from "./components/search/app-search/app-search.component";
import {AppSearchTerm} from "./components/search/app-search-term/app-search-term.component";
import {AppSearchResult} from "./components/search/app-search-result/app-search-result.component";
import {AppDeviceList} from "./components/device-list/app-device-list/app-device-list.component";
import {appRoutes} from "./app-routes";


@NgModule({
  declarations: [
    AppMain,
    AppSearch,
    AppSearchTermBuilder,
    AppSearchTerm,
    AppHeaderComponent,
    AppSidebarPanelComponent,
    AppSearchResult,
    AppDeviceList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropDownsModule,
    ButtonsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SearchService
  ],
  bootstrap: [
    AppMain]
})
export class AppModule {
}
