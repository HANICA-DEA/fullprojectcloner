import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {UserDto} from '../dto/user.dto';
import {DatabaseService} from '../share/database.service';
import {AuthdataDto} from '../dto/authdata.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Observable<firebase.User>;
  private _userdata: UserDto;
  private _userDetails: firebase.User = null;
  // De noodzakelijke gegevens
  private _username;
  private _token;

  constructor(private _afAuth: AngularFireAuth, private router: Router, private databaseService: DatabaseService) {
    this._user = _afAuth.authState;
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
  public loginwithGithub(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loginwithGithubProvider().then(
        res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  public loginwithGithubProvider(): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this._afAuth.auth.signInWithPopup(
        new firebase.auth.GithubAuthProvider()).then(res => {
        const data = new AuthdataDto(res.additionalUserInfo.username, res.credential['accessToken'])
        this.databaseService.pushToDatabase('user', res.user.uid, data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  public logout(): Promise<boolean | Observable<never> | never> {
    return this._afAuth.auth.signOut()
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


  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }


  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }


  get afAuth(): AngularFireAuth {
    return this._afAuth;
  }

  set afAuth(value: AngularFireAuth) {
    this._afAuth = value;
  }
}
