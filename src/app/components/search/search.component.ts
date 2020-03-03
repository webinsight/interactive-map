import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {  OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() locationEmit = new EventEmitter();
  @Output() clearEmit = new EventEmitter();
  searchedValues: any[] = [];
  inputText: string;

  constructor() { }

  ngOnInit() {}

  async autocomplete() {
    const provider = new OpenStreetMapProvider();
    this.searchedValues = await provider.search({ query: this.inputText + ' Кропивницкий' });
  }

  onSelectAddress(value) {
    this.locationEmit.emit({x: value.x, y: value.y});
  }
  clear() {
    this.inputText = '';
    this.clearEmit.emit();
  }
}
