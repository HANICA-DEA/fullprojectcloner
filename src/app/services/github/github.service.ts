import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PostrequestDto} from '../../entities/github/postrequest.dto';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  static handleError(error: HttpErrorResponse): Observable<never> {
    // return an observable with a user-facing error message
    return throwError(error);
  }

  // getUser(token: string): Observable<Object> {
  //   const url = this._baseUrl + '/user?access_token=' + token;
  //   return this.http.get(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getRepositories(token: string, username: string): Observable<Object> {
    const url = this._baseUrl + '/users/' + username + '/repos?access_token=' + token;
    return this.http.get(url).pipe(
      catchError(GithubService.handleError)
    );
  }

  getRepositoryIssues(token: string, username: string, repository: string): Observable<Object> {
    const url = this._baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.get(url).pipe(
      catchError(GithubService.handleError)
    );
  }

  importRepository(token: string, username: string, repository: string, content: Object): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });

    const url = this._baseUrl + '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token;
    return this.http.put(url, JSON.stringify(content), {headers: headers});
  }

  persistIssue(token: string, username: string, repository: string, content: Object): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.barred-rock-preview'
    });
    const url = this._baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }

  persistRepository(token: string, name: string): Promise<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this._baseUrl + '/user/repos?access_token=' + token;
    const content = new PostrequestDto(name, '© Fullprojectcloner ' + name, 'https://github.com/', false, true, true, true);
    return this.http.post(url, JSON.stringify(content), {headers: headers}).toPromise();
  }
}
