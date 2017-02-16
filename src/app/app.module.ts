import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import {SearchService} from "./services/app.search.service";
import {AppSearch} from "./components/app-search/app-search.component";
import {AppMain} from "./components/app-main/app-main";
import {AppSearchTermBuilder} from "./components/app-search-term-builder/app-search-term-builder.component";
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarPanelComponent } from './components/app-sidebar-panel/app-sidebar-panel.component';

@NgModule({
  declarations: [
    AppMain,
    AppSearch,
    AppSearchTermBuilder,
    AppHeaderComponent,
    AppSidebarPanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    DropDownsModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [
    AppMain]
})
export class AppModule {
}
