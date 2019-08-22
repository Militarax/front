import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import {Profile, SearchProfile} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class SearchProfileService {
  constructor(private http: HttpClient) {
  }
  getAllResults() {
    return this.http.get<Profile[]>(`${environment.baseUrl}allresults/`).toPromise();
  }
  PostSearchCriteria(searchCriteria: SearchProfile[]) {
    return this.http.post(`${environment.baseUrl}scrapyapp/start/`, searchCriteria).toPromise();
  }
}
