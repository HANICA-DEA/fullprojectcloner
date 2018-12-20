import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {PostrequestDto} from '../../entities/github/postrequest.dto';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getUser(token: string): Observable<Object> {
    const url = this.baseUrl + '/user?access_token=' + token;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getRepositories(token: string, username: string): Observable<Object> {
    const url = this.baseUrl + '/users/' + username + '/repos?access_token=' + token;
    return this.http.get(url);
  }

  getRepositoryIssues(token: string, username: string, repository: string): Observable<Object> {
    const url = this.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.get(url);
  }

  importRepository(token: string, username: string, repository: string, content: Object): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });
    const url = this.baseUrl + '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token;
    return this.http.put(url, JSON.stringify(content), {headers: headers});

  }

  persistIssue(token: string, username: string, repository: string, content: Object): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });
    const url = this.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }

  persistRepository(token: string, name: string): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.baseUrl + '/user/repos?access_token=' + token;
    const content = new PostrequestDto(name, '© Fullprojectcloner ' + name, 'https://github.com/', false, true, true, true);
    return this.http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
