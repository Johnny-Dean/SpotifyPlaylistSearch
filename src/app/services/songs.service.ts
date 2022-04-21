import {Injectable} from '@angular/core';
import {SpotifyApiService} from "./spotify-api.service";
import {Song} from "../songs/song";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songs: Song[] = [];

  getSongs(){
    this.getPlaylists(0)
      .subscribe((playlists: any) => this.parsePlaylists(playlists));
    return this.songs;
  }

  // if our response contains next it means theres more playlists we need to get
  // we increment the offset to get the next batch of spotify playlists
  getPlaylists(offset: number): Observable<any> {
   return this.spotify.getPlaylistCollection(offset).pipe(
      map((playlistCollection: any) => {
        if (playlistCollection.next) this.getPlaylists(offset + 20);
        return playlistCollection.items;
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
            let duplicateFound = this.checkDuplicates(spotifyTrack.track, playlistName);
            if(!duplicateFound) this.songs.push(this.castSpotifyTrackToSong(spotifyTrack, playlistName));
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

  checkDuplicates(track: any, playlistName: string): boolean{
    // bad but error handling if spotify api returns us a null track name
    if (!track) return true;
    for (const song of this.songs) {
      if(song.name === track.name){
        song.playlists.push(playlistName)
        return true;
      }
    }
    return false;
  }

  constructor(private spotify: SpotifyApiService) { }
}
