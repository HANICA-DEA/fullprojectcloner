import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
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
  userIsLoggedIn: boolean;

  loginwithGithubProvider(): Promise<any> {
    return new Promise((resolve, reject) => resolve());
  }

  public get isLoggedIn(): boolean {
    return this.userIsLoggedIn;
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => resolve());
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentService: AuthService;

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
      providers: [AuthService]
    });
    TestBed.overrideComponent(LoginComponent, {
      set: {
        providers: [
          {provide: AuthService, useClass: MockAuthService}
        ]
      }
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    componentService = fixture.debugElement.injector.get(AuthService);
  }));
  // Instance and HTML tests
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Service injected via component should be an instance of MockAuthService', () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });
  it('Loginbutton calls signInWithGithub', async(() => {
    spyOn(component, 'signInWithGithub');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#signInWithGithub');
    button.click();
    expect(component.signInWithGithub).toHaveBeenCalled();
  }));

  it('LogoutButton calls Logout', async(() => {
    componentService.userIsLoggedIn = true;
    spyOn(component, 'logout');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#logout');
    button.click();
    expect(component.logout).toHaveBeenCalled();
  }));
  it('signInWithGithub() Should reset LoginError from false to null', async(() => {
    expect(component.loginError).toEqual(false);
    component.signInWithGithub();
    expect(component.loginError).toBeNull();
  }));

  it('signInWithGithub() Should set POPUP_CLOSED error  ', fakeAsync(() => {
    spyOn(componentService, 'loginwithGithubProvider')
      .and.returnValue(Promise.reject('auth/popup-closed-by-user'));

    component.signInWithGithub();
    flushMicrotasks();
    expect(component.loginError).toBe('The popup has been closed before authentication');
  }));

  it('signInWithGithub() Should set FIREBASE_REQUEST_EXESS error  ', fakeAsync(() => {
    spyOn(componentService, 'loginwithGithubProvider')
      .and.returnValue(Promise.reject('auth/too-many-requests'));

    component.signInWithGithub();
    flushMicrotasks();
    expect(component.loginError).toBe('To many requests to the server');
  }));

  it('Logout() Should reset LoginError from false to null', async(() => {
    expect(component.loginError).toEqual(false);
    component.logout();
    expect(component.loginError).toBeNull();
  }));

  it('logout() Should sets FIREBASE_NO_USER error  ', fakeAsync(() => {
    spyOn(componentService, 'logout')
      .and.returnValue(Promise.reject('auth/null-user'));

    component.logout();
    flushMicrotasks();
    expect(component.loginError).toBe('No user found | Try to login/logout again');
  }));
});
