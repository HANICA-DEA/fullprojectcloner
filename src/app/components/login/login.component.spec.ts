import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {MatCardModule} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {Router, RouterModule} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {GithubService} from '../../services/github/github.service';
import {Observable} from 'rxjs';
import {promise} from 'selenium-webdriver';
import {any} from 'codelyzer/util/function';

class MockAuthService implements Partial<AuthService> {
  isAuthenticated() {
    return 'Mocked';
  }

  loginwithGithubProvider() {
    return new Promise((resolve, reject) => resolve());
  }

  logout(): Promise<boolean | Observable<never> | never> {
    return new Promise(function(resolve, reject) { resolve(); });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentService: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const ghServiceSpy = jasmine.createSpyObj('GithubService', ['methodName']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([{path: '', component: LoginComponent}]),
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        AuthService,
        AngularFirestore,
        AngularFireAuth,
        HttpClient,
        HttpHandler
      ]
    });
    TestBed.overrideComponent(LoginComponent, {
      set: {
        providers: [
          {provide: AuthService, useClass: MockAuthService},
          {provide: Router, useValue: routerSpy},
          {provide: GithubService, useValue: ghServiceSpy},
        ]
      }
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    componentService = fixture.debugElement.injector.get(AuthService);
  }));

  it("Service injected via component should be an instance of MockAuthService", () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });

  it("signInWithGithub() Should reset LoginError from false to null", async(() => {
    expect(component.loginError).toEqual(false);
    component.signInWithGithub();
    expect(component.loginError).toBeNull();
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });

  it('Login should be successful', () => {
    spyOn(componentService, 'loginwithGithubProvider').and.returnValue(true);
  });

  // it('Logginbutton calls signInWithGithub', async(() => {
  //   spyOn(component, 'signInWithGithub');
  //   const button = fixture.debugElement.nativeElement.querySelector('#signInWithGithub');
  //   button.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.signInWithGithub).toHaveBeenCalled();
  //   });
  // }));
  //
  //
  // it('LogoutButton calls Logout', async(() => {
  //   //componentService.setUserIsLoggedIn(true);
  //   spyOn(component, 'logout');
  //   const button = fixture.debugElement.nativeElement.querySelector('#logout');
  //   button.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.logout).toHaveBeenCalled();
  //   });
  // }));
});
