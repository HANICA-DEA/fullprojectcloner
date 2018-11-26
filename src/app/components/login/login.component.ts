import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserDto} from '../../services/dto/user.dto';


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
