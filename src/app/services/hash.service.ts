import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// should be named auth service
export class HashService {
  private CLIENT_ID: string = "61a11e8fbef94b8f8c2a99ca365504b8";
  private SPOTIFY_AUTHORIZE_ENDPOINT: string = "https://accounts.spotify.com/authorize";
  private REDIRECT_URI_AFTER_AUTH: string = "http://localhost:4200/songs"
  SCOPES: string[] = ["playlist-read-collaborative"];

  generateRedirectURL(): string{
  return `${this.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI_AFTER_AUTH}&scope=${this.SCOPES}&response_type=token&show_dialog=true`;
  }

  parseHash(hash: string): string {
    const stringAfterHash = hash.substring(1);
    const parametersInURL = stringAfterHash.split("&")
    const parameterSplit = parametersInURL.reduce((acc:{[key: string]: string}, currentVal) => {
      const [key, value] = currentVal.split("=");
      acc[key] = value;
      return acc;
    }, {})
    return parameterSplit['access_token'];
  }

  constructor() { }
}
