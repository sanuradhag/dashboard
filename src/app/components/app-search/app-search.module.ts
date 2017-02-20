import {NgModule} from '@angular/core';

import {AppSearchTermBuilder} from "./app-search-term-builder/app-search-term-builder.component";
import {AppSearch} from "./app-search.component";
import {AppSearchTerm} from "./app-search-term/app-search-term.component";
import {SearchService} from "../app-search/shared/app.search.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  exports: [AppSearch],
  declarations: [AppSearch, AppSearchTermBuilder, AppSearchTerm],
  providers: [SearchService],
})
export class SearchModule {
}

