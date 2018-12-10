import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Headers} from '@angular/http';
import {PostrequestDto} from '../dto/postrequest.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getUser(token: String) {
    const url = 'https://api.github.com/user?access_token=' + token;
    return this.http.get(url);
  }

  getRepositories(token: String, username: String): Observable<Object> {
    const url = 'https://api.github.com/users/' + username + '/repos?access_token=' + token;
    return this.http.get(url);
  }

  getRepositoryIssues(token: String, username: String, repository: String): Observable<Object> {
    const url = 'https://api.github.com/repos/' + username + '/' + repository + 'test/issues?access_token=' + token;
    return this.http.get(url);
  }

  importRepository(token: String, username: String, repository: String, content: Object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'application/vnd.github.barred-rock-preview'
    });
    const url = 'https://api.github.com/repos/' + username + '/' + repository + '/import?access_token=' + token;
    this.http.post(url, content, {headers: headers});
  }

  persistIssue(token: String, username: String, repository: String, content: Object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'application/vnd.github.barred-rock-preview'
    });
    const url = 'https://api.github.com/repos/' + username + '/' + repository + '/import?access_token=' + token;
    this.http.post(url, content, {headers: headers});
  }

  persistRepository(token: String, name: String) {
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const url = 'https://api.github.com/user/repos?access_token=' + token;
      const content = new PostrequestDto(name, '© Fullprojectcloner ' + name, 'https://github.com/', false, true, true, true);
      this.http.post(url, content, {headers: headers});
    }
  }
}
