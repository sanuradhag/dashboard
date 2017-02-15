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

@NgModule({
  declarations: [
    AppMain,
    AppSearch,
    AppSearchTermBuilder
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
