import {Component, Input, OnInit} from '@angular/core';
import {song} from "./song";
import {HashService} from "../services/hash.service";
import {AuthService} from "../services/auth.service";
import {ParseSongsService} from "../services/parse-songs.service";

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

  getSongs(){
    this.songs = this.songHelper.getSongs()
  }

  constructor(private songHelper: ParseSongsService, private hash: HashService, private auth: AuthService) { }

  ngOnInit(): void {
    const hashInBrowser = window.location.hash;
    this.auth.authenticateUser(this.hash.parseHash(hashInBrowser))
    this.getSongs();
  }

}
