import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  getRegionsData(): Promise<any> {
    return this.http.get('https://krop.osvita-mrk.gov.ua/api/v1/get_areas_and_schools').toPromise();
  }
}
