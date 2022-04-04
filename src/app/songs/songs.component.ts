import {Component, Input, OnInit} from '@angular/core';
import {Song} from "./song";
import {SONGS} from "./mock-songs";
import {SpotifyApiService} from "../spotify-api.service";
import {playlist} from "./Playlist";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = SONGS;
  filteredSongs: Song[] = this.songs;
  playlists: playlist[] = [];
  searchWord?: String;
  // use an enum for readability?
  @Input() searchType: string = "song";

  searchSong(searchValue: string, searchType: string): void{
    // cannnot access with just [searchType] because of TS is there a better way to write this?
    switch (searchType){
      case "song": {
        this.filteredSongs = this.songs.filter(song => {
          return song.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        break;
      }
      case "album": {
        this.filteredSongs = this.songs.filter(song => {
          return song.playlist.toLowerCase().includes(searchValue.toLowerCase())
        })
        break;
      }
      case "artist": {
        this.filteredSongs = this.songs.filter(song => {
          return song.artist.toLowerCase().includes(searchValue.toLowerCase())
        })
        break;
      }
    }

  }
// when populating our playlists array we should make api calls to get the songs for the playlist array and populate the songs array in our playlist
  populatePlaylist(playListArr: any) {
    for (const playlist of playListArr){
      console.log(this.spotify.getPlaylistSongs(playlist.tracks.href));
      this.playlists.push({name: playlist.name});
    }
  }


  constructor(private spotify: SpotifyApiService ) { }


  ngOnInit(): void {
    // any is bad here very bad we want to use ts to describe what is going on at all times what is a good workaroud for this?
    this.spotify.getPlaylists().subscribe((res: any) => {
      console.log(res)
      this.populatePlaylist(res.items)
      // probably should handle this in the api call service lol..
      if(res.next){
        this.spotify.getAdditionalPlaylists().subscribe((res:any) => this.populatePlaylist(res.items))
      }
    });

    console.log(this.playlists)
  }

}
