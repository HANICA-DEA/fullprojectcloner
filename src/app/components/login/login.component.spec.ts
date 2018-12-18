import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {MatCardModule} from '@angular/material';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterModule} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {reject, resolve} from 'q';

class MockAuthService  extends AuthService {

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([{ path: '', component: LoginComponent}]),
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        AngularFirestore,
        AngularFireAuth,
        HttpClient,
        HttpHandler
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(service instanceof MockAuthService).toBeTruthy();
  });
  it('Login should be successful', () => {
    spyOn(service, 'loginwithGithubProvider').and.returnValue(Promise.resolve());
    expect(component.loginError).toBeFalsy();
    // expect(service.loginwithGithubProvider).toHaveBeenCalled();
  });
  it('Login should display error', (done) => {
    spyOn(service, 'returnfalse').and.returnValue(Promise.reject('auth/popup-closed-by-user'));
    component.signInWithGithub();

    expect(component.loginError).toBe('The popup has been closed before authentication');
  });
  it('Login should display error', () => {
    spyOn(service, 'loginwithGithubProvider').and.returnValue(resolve(''));
    expect(component.loginError).toBeFalsy();
  });
});
