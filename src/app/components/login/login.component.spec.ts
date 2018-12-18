import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

class MockAuthService  extends AuthService {
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;

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
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(authService instanceof MockAuthService).toBeTruthy();
  });
  it('Login should be successful', () => {
    spyOn(authService, 'loginwithGithubProvider').and.returnValue(true);
  });

  it('Logginbutton calls signInWithGithub', async(() => {
     spyOn(component, 'signInWithGithub');

    const button = fixture.debugElement.nativeElement.querySelector('#signInWithGithub');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.signInWithGithub).toHaveBeenCalled();
    });
  }));

  it('LogoutButton calls Logout', async(() => {
    authService.setUserIsLoggedIn(true);
    spyOn(component, 'logout');
    const button = fixture.debugElement.nativeElement.querySelector('#logoutButton');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.logout).toHaveBeenCalled();
    });

  }));
});
