import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {GithubService} from '../../services/github/github.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginError: string;

  constructor(public authService: AuthService, public router: Router, private data: GithubService) {
  }

  public signInWithGithub(): void {
    this.authService.loginwithGithubProvider()
      .then(this.loginError = null)
      .catch(err => {
        this.loginError = err;
      }
    );
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
  }
}
