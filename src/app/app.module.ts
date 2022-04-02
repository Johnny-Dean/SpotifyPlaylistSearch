import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { SearchTypeComponent } from './search-type/search-type.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SearchComponent,
    SearchTypeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
