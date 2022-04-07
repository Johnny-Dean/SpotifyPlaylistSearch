import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {song} from "../songs/Playlist";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  token = localStorage.getItem("access_token")
  constructor(private http: HttpClient) { }

  getPlaylists = (offset: string, limit: string) => {
   return this.http.get(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`, {
     headers: {
       Authorization: `Bearer ${this.token}`,
     },
   })
  }

  // another any
  getPlaylistSongs(url: string): Observable<any>{
    // any is bad here again!!! ask sif
     return this.http.get(url, {
       headers: {
         Authorization: `Bearer ${this.token}`,
       },
    })
  }
}
