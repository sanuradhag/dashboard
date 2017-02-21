import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {AppMain} from "./components/app-main/app-main";
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppSidebarPanelComponent} from './components/app-sidebar-panel/app-sidebar-panel.component';
import {AppSearchResult} from "./components/app-search/app-search-result/app-search-result.component";
import {AppDeviceList} from "./components/device-list/app-device-list/app-device-list.component";
import {SearchModule} from "./components/app-search/app-search.module";
import {SharedModule} from "./components/shared/shared.module";
import {appRoutes} from "./app-routes";
import { ClickOutsideModule } from "ng-click-outside";
@NgModule({
  declarations: [
    AppMain,
    AppHeaderComponent,
    AppSidebarPanelComponent,
    AppSearchResult,
    AppDeviceList
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(appRoutes),
    SearchModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppMain]
})
export class AppModule {
}
