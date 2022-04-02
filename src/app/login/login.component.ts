import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private CLIENT_ID: string = "61a11e8fbef94b8f8c2a99ca365504b8";
  private SPOTIFY_AUTHORIZE_ENDPOINT: string = "https://accounts.spotify.com/authorize";
  private REDIRECT_URI_AFTER_AUTH: string = "http://localhost:8989/"
  SCOPES: string[] = ["playlist-read-collaborative"];

  constructor() { }

  ngOnInit(): void {

  }

  handleLogin(): void{
    window.location.href =  (`${this.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI_AFTER_AUTH}&scope=${this.SCOPES}&response_type=token&show_dialog=true`);
  }


}
