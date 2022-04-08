import { Injectable } from '@angular/core';
import {SpotifyApiService} from "./spotify-api.service";
import {song} from "../songs/song";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParseSongsService {
  // is this proper
  songs: song[] = [];

  parseSongObject(trackObj: any, playlistName: string):song {
    return {
      name: trackObj.track.name,
      artistName: trackObj.track.artists[0].name,
      album: {
        albumArt: trackObj.track.album.images[0].url,
        albumName: trackObj.track.album.name
      },
      playlists: [`${playlistName}`]
    };
  }

  checkDuplicates(checkTrack: any, playlistName: string): boolean{
    for (const s of this.songs) {
      if(s.name === checkTrack.track.name){
        s.playlists.push(playlistName)
        return true;
      }
    }
    return false;
  }

  populatePlaylists(playlistArr: any): void{
    for (const playlist of playlistArr){
      this.spotify.getPlaylistSongs(playlist.tracks.href).pipe(
        map((res) => {
          (
            res.items.map((trackObj: any) => {
              let duplicateFound: boolean = this.checkDuplicates(trackObj, playlist.name);
              if(!duplicateFound) {
                this.songs.push(this.parseSongObject(trackObj, playlist.name));
              }
            }))
        })
      ).subscribe()
    }
  }

  getPlaylist(offset: number, limit: number){
      this.spotify.getPlaylists( offset.toString(), limit.toString() ).subscribe((res: any) => {
        this.populatePlaylists(res.items)
        if (res.next){
          this.getPlaylist(offset + 20, limit + 20);
        }
      })
  }

  getSongs(){
    this.getPlaylist(0, 20)
    return this.songs
  }

  constructor(private spotify: SpotifyApiService) { }
}
