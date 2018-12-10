import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, private data: DataService) {
  }

  public signInWithGithub(): void {
    this.authService.loginwithGithubProvider();
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
  }
}
