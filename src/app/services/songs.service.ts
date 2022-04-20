import { Injectable } from '@angular/core';
import {SpotifyApiService} from "./spotify-api.service";
import {song} from "../songs/song";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songs: song[] = [];

  parseSongObject(trackObj: any, playlistName: string):song {
    return {
      name: trackObj.track.name,
      artistName: trackObj.track.artists[0].name,
      album: {
        albumArt: trackObj.track.album.images[0]?.url,
        albumName: trackObj.track.album.name
      },
      playlists: [`${playlistName}`]
    };
  }

  checkDuplicates(track: any, playlistName: string): boolean{
    // bad but error handling if spotify api returns us a null track name
    if (!track) return true;
    for (const s of this.songs) {
      if(s.name === track.name){
        s.playlists.push(playlistName)
        return true;
      }
    }
    return false;
  }

  populateSongs(playlistArr: any): void {
    for (const playlist of playlistArr){
      this.spotify.getPlaylistSongs(playlist.tracks.href).pipe(
        map((response) => {
          (
            response.items.map(
              (trackObj: any) => {
              let duplicateFound = this.checkDuplicates(trackObj.track, playlist.name);
              if(!duplicateFound) this.songs.push(this.parseSongObject(trackObj, playlist.name));
            }))
        })
      ).subscribe()
    }
  }

  // if our response contains next it means theres more playlists we need to get
  // we increment the offset
  getPlaylist(offset: number){
    this.spotify.getPlaylists(offset.toString()).subscribe(
        (response: any) => {
        this.populateSongs(response.items)
        if (response.next) this.getPlaylist(offset + 20);
      })
  }

  // tried to create my own promise from the recursive calling but it ended up being kind of confusing
  // actually have no idea how its not working, i think its because the recursive function pushes the calls onto the stack
  // and dont return until its all done
  getSongs(){
    this.getPlaylist(0)
    return this.songs
  }

  constructor(private spotify: SpotifyApiService) { }
}
