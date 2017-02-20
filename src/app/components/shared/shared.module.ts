import {NgModule} from '@angular/core';
import { CommonModule }        from '@angular/common';
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns/dist/npm/dropdowns.module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropDownsModule,
    ButtonsModule
  ],
  exports: [BrowserModule,FormsModule,CommonModule,ButtonsModule,DropDownsModule],
  declarations: [],
  providers: [],
})
export class SharedModule {
}
