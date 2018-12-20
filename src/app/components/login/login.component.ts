import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginError: string;

  constructor(public authService: AuthService) {
  }

  public signInWithGithub(): void {
    this.authService.loginWithGithubProvider()
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
