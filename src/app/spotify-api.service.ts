import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  token = localStorage.getItem("access_token")
  constructor(private http: HttpClient) { }


  // this is so bad!!!!!!!!!!!!!!
  getPlaylists = () => {
   console.log(this.token)
   return this.http.get("https://api.spotify.com/v1/me/playlists", {
     headers: {
       Authorization: `Bearer ${this.token}`,
     },
   })
  }

  getAdditionalPlaylists = () => {
    return this.http.get("https://api.spotify.com/v1/me/playlists?offset=0&limit=20", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  getPlaylistSongs = (url: string) => {
    // any is bad here again!!! ask sif
     this.http.get(url, {
       headers: {
         Authorization: `Bearer ${this.token}`,
       },
    }).subscribe((res: any) => {
      return res;
     })
  }
}
