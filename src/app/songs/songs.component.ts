import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpotifyApiService} from "../services/spotify-api.service";
import {playlist, song} from "./Playlist";
import {HashService} from "../services/hash.service";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  playlists: playlist[] = [];
  @Input() filterSong?: string = '';

  onTermChange(searchTerm: string){
    this.filterSong = searchTerm;
  }

  parseSongObject(trackObj: any):song {
    return {
      name: trackObj.track.name,
      artistName: trackObj.track.artists[0].name,
      album: {
        albumArt: trackObj.track.album.images[0].url,
        albumName: trackObj.track.album.name
      }
    };
  }

  populatePlaylists(playlistArr: any){
    for (const playlist of playlistArr){
      const playlistTracks: song[] = [];

      this.spotify.getPlaylistSongs(playlist.tracks.href).pipe(
        map((res) => {
          (
            res.items.map((trackObj: any) => {
              playlistTracks.push(this.parseSongObject(trackObj));
          }))
        })
      ).subscribe()
      this.playlists.push({name: playlist.name, image: playlist.images[0], songs: playlistTracks});
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
