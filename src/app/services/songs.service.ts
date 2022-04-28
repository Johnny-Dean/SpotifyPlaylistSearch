import {Injectable} from '@angular/core';
import {SpotifyApiService} from "./spotify-api.service";
import {Song} from "../songs/song";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private _songs: Song[] = [];

  getSongs(){
    return this._songs;
  }

  // if our response contains next it means theres more playlists we need to get
  // we increment the offset to get the next batch of spotify playlists
  getPlaylists(offset: number): Observable<any> {
    return this.spotify.getPlaylistCollection(offset).pipe(
      map((playlistCollection: any) => {
        // console.log(playlistCollection)
        if (playlistCollection.next) this.getPlaylists(offset + 20);
        return this.parsePlaylists(playlistCollection.items);
      }))
  }

  parsePlaylists(playlists: any[]): void {
    for (const playlist of playlists){
      const playlistSongs = this.spotify.getSongsFromPlaylist(playlist.tracks.href);
      playlistSongs.pipe(this.addSongs(playlist.name)).subscribe()
    }
  }

  // is the extra pipe needed or can i just return the map?
  addSongs(playlistName: string){
    return map((response: any) => {
        response.items.map(
          (spotifyTrack: any) => {
            let isDuplicate = this.checkDuplicate(spotifyTrack.track, playlistName);
            if(!isDuplicate) this._songs.push(this.castSpotifyTrackToSong(spotifyTrack, playlistName));
          }
        )
      })
  }

  castSpotifyTrackToSong(spotifyTrack: any, playlistName: string):Song {
    return {
      name: spotifyTrack.track.name,
      artistName: spotifyTrack.track.artists[0].name,
      album: {
        albumArt: spotifyTrack.track.album.images[0]?.url,
        albumName: spotifyTrack.track.album.name
      },
      playlists: [`${playlistName}`]
    };
  }

  checkDuplicate(track: any, playlistName: string): boolean{
    // bad but error handling if spotify api returns us a null track name
    if (!track) return true;
    for (const song of this._songs) {
      if(song.name === track.name){
        song.playlists.push(playlistName)
        return true;
      }
    }
    return false;
  }

  constructor(private spotify: SpotifyApiService) {
    this.getPlaylists(0).subscribe();
  }
}
