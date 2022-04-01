import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.css']
})
export class SearchTypeComponent implements OnInit {
  @Output() searchTypeEmitter = new EventEmitter<string>();
  searchType?: string;

  onSearchTypeChange(searchType: string): void {
    this.searchTypeEmitter.emit(searchType);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
