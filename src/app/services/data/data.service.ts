import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getrepositories() {
    const url: String =  'https://api.github.com/users/Kev4ever/repos?access_token=&scope=user%20public_repo'
    return this.http.get(url);
  }
}
