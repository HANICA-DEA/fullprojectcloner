import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {UserDto} from '../dto/user.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;
  private _userdata: Observable<UserDto>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
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
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

// ff afmaken (*kevin*)

  public loginwithGithubProvider(): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(
        new firebase.auth.GithubAuthProvider()).then(
        res => {
          resolve(res);
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
    if (this._userDetails == null) {
      return false;
    } else {
      return true;
    }
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
