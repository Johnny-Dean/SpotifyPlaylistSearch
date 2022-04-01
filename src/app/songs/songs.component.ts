import {Component, Input, OnInit} from '@angular/core';
import {Song} from "./song";
import {SONGS} from "./mock-songs";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = SONGS;
  filteredSongs: Song[] = this.songs;
  searchWord?: String;
  // use an enum for readability?
  @Input() searchType: string = "Song";

  searchSong(searchValue: string, searchType: string): void{
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


  constructor() { }

  ngOnInit(): void {
  }

}
