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
  private _userdata: UserDto;

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

  public loginwithGithub(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider());
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

  getUserData() {
    return this._userDetails;
  }
}