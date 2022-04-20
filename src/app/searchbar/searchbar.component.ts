import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output() searchTermEmitter= new EventEmitter<string>();
  searchTerm?: string = "";

  onChange(): void {
    this.searchTermEmitter.emit(this.searchTerm)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
