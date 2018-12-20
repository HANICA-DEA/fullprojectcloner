import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {GithubService} from '../../services/github/github.service';
import {Errorcode} from './errorcode.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],

})
export class LoginComponent implements OnInit {
  public loginError: string | boolean = false;

  constructor(public authService: AuthService, public router: Router, private data: GithubService) {
  }

  public signInWithGithub(): void {
    this.authService.loginwithGithubProvider()
      .then(this.loginError = null)
      .catch(err => {
          if (err === Errorcode.FIREBASE_POPUP_CLOSED) {
            console.log('e');
            const message = 'The popup has been closed before authentication';
            this.loginError = message;
            throw new Error(message);
          }
          if (err === Errorcode.FIREBASE_REQUEST_EXESS) {
            const message = 'To many requests to the server';
            this.loginError = message;
            throw new Error(message);
          }
        }
      );
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
