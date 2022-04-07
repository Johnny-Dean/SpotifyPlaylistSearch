import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchTermEmitter = new EventEmitter<string>();
  userSearch?: string;

  onUserSearch(): void {
    this.searchTermEmitter.emit(this.userSearch);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
