import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  getRegionsData(): Promise<any> {
    return this.http.get('assets/json/map-data.json').toPromise();
  }
}
