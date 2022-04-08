import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpotifyApiService} from "../services/spotify-api.service";
import {song} from "./Playlist";
import {HashService} from "../services/hash.service";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: song[] = [];
  @Input() filterSong?: string = '';

  onTermChange(searchTerm: string){
    this.filterSong = searchTerm;
  }

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

  constructor(private spotify: SpotifyApiService, private hash: HashService, private auth: AuthService) { }

  ngOnInit(): void {

    const hashInBrowser = window.location.hash;
    this.auth.authenticateUser(this.hash.parseHash(hashInBrowser))
    // any is bad here very bad we want to use ts to describe what is going on at all times what is a good workaroud for this?
    // recursive api calls?
    this.getPlaylist(0, 20)
  }

}
