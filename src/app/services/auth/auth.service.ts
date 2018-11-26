import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {UserDto} from '../dto/user.dto';
import {DatabaseService} from '../share/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;
  private _userdata: UserDto;
  private _token;

  constructor(private afAuth: AngularFireAuth, private router: Router, private databaseService: DatabaseService) {
    this._user = afAuth.authState;
    this._user.subscribe(
      (user) => {
        if (user) {
          this._userDetails = user;
        } else {
          this._userDetails = null;
        }
      }
    );
  }
  public loginwithGithub() {
    return new Promise<any>((resolve, reject) => {
      this.loginwithGithubProvider().then(
        res => {
          this.userdata = new UserDto().deserialize(JSON.parse(JSON.stringify(this.userDetails)));
          this.databaseService.pushToDatabase('user', 'tim', this.userdata);
          console.log(this.databaseService.getFromDatabase('user', 'kevin'));
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  public loginwithGithubProvider(): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(
        new firebase.auth.GithubAuthProvider()).then(res => {
        // const AccessToken = res.credential['accessToken'];
        // console.log('Access token', AccessToken);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  public logout(): Promise<boolean | Observable<never> | never> {
    return this.afAuth.auth.signOut()
      .then((res) => this.router.navigate(['/'])
        .catch((err) => throwError('signout failed')));
  }

  public get isLoggedIn(): boolean {
    return this._userDetails != null;
  }
  get user(): Observable<firebase.User> {
    return this._user;
  }

  get userDetails(): firebase.User {
    return this._userDetails;
  }


  get userdata(): UserDto {
    return this._userdata;
  }

  set userdata(value: UserDto) {
    this._userdata = value;
  }
}
