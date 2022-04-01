import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { SearchTypeComponent } from './search-type/search-type.component';



@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SearchComponent,
    SearchTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
