import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {SongsComponent} from "./songs/songs.component";

const routes: Routes = [
  { path: '',  component: LoginComponent},
  { path: 'songs',  component: SongsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
