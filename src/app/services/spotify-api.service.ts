import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  token = localStorage.getItem("access_token")


  constructor(private http: HttpClient) { }

  getPlaylistCollection = (offset: number) => {
    const offsetStr = offset.toString();
   return this.http.get(`https://api.spotify.com/v1/me/playlists?offset=${offsetStr}&limit=20`, {
     headers: {
       Authorization: `Bearer ${this.token}`,
     },
   })
  }

  // another any
  getSongsFromPlaylist(playlistTracksUrl: string): Observable<any>{
    // any is bad here again!!! ask sif
    // should I do like interface {} and map the values in our res here to that or?
     return this.http.get(playlistTracksUrl, {
       headers: {
         Authorization: `Bearer ${this.token}`,
       },
    })
  }
}
