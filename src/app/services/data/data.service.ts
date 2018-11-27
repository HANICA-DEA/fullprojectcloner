import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getUser(token: String) {
    const url =  'https://api.github.com/user?access_token=' + token;
    return this.http.get(url);
  }
  getrepositories(token: String, username: String): Observable<Object> {
    const url =  'https://api.github.com/users/' + username + '/repos?access_token=' + token;
    return this.http.get(url);
  }
}
