import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Headers, Http} from '@angular/http';
import {PostrequestDto} from '../dto/postrequest.dto';
import {resolve} from 'q';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private _http: HttpClient) {
  }

  getUser(token: string): Observable<Object> {
    const url = 'https://api.github.com/user?access_token=' + token;
    return this._http.get(url);
  }

  getRepositories(token: string, username: string): Observable<Object> {
    const url = 'https://api.github.com/users/' + username + '/repos?access_token=' + token;
    return this._http.get(url);
  }

  getRepositoryIssues(token: string, username: string, repository: string): Observable<Object> {
    const url = 'https://api.github.com/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this._http.get(url);
  }

  importRepository(token: string, username: string, repository: string, content: Object): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });
    const url = 'https://api.github.com/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token;
    return this._http.put(url, JSON.stringify(content), {headers: headers});

  }

  persistIssue(token: string, username: string, repository: string, content: Object): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });
    const url = 'https://api.github.com/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this._http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }

  persistRepository(token: string, name: string): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = 'https://api.github.com/user/repos?access_token=' + token;
    const content = new PostrequestDto(name, '© Fullprojectcloner ' + name, 'https://github.com/', false, true, true, true);
    return this._http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }
}
