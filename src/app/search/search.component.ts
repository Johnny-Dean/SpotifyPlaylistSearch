import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter<string>();
  searchWord?: string;

  onUserSearch(): void {
    this.searchEmitter.emit(this.searchWord)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
