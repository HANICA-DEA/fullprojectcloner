import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getrepositories() {
    const url: string =  'https://api.github.com/users/TimMaasGeesteranus/repos?access_token=&scope=user%20public_repo';
    return this.http.get(url);
  }
}