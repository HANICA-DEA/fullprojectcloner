import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {

    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  public loginwithGithub() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider());
  }

  public logout() {
    return this.afAuth.auth.signOut()
      .then((res) => this.router.navigate(['/'])
        .catch((err) => throwError('signout failed')));
  }

  get isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
}
