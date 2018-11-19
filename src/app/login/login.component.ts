import {Component, OnInit} from '@angular/core';

import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
  }

  signInWithGithub() {
    this.authService.loginwithGithub();

  }

  public logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }
}
