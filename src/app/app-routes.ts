import {Routes} from "@angular/router";
import {AppDeviceList} from "./components/device-list/app-device-list/app-device-list.component";
import {AppSearchResult} from "./components/app-search/app-search-result/app-search-result.component";
import {AppSearch} from "./components/app-search/app-search.component";

export const appRoutes: Routes = [
  { path: 'search', component: AppSearch },
  { path: 'search-results', component: AppSearchResult },
  { path: 'device-list', component: AppDeviceList },
  { path: '',   redirectTo: '/search', pathMatch: 'full' }
];
