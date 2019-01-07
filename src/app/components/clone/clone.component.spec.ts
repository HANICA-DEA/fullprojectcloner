import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule, MatExpansionModule} from '@angular/material';
import {CloneComponent} from './clone.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from "../login/login.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";


class MockAuthService implements Partial<AuthService> {
  userIsLoggedIn: boolean;

  public get isLoggedIn(): boolean {
    return this.userIsLoggedIn;
  }

  loginwithGithubProvider(): Promise<any> {
    return new Promise((resolve, reject) => resolve());
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => resolve());
  }
}


describe('CloneComponent', () => {
  let component: CloneComponent;
  let fixture: ComponentFixture<CloneComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule,
        MatCardModule,
        RouterTestingModule.withRoutes([{path: 'clone/:id', component: CloneComponent}])
      ],
      declarations: [
        CloneComponent,
        LoginComponent
      ], providers: [
        AuthService,
        AngularFirestore,
        AngularFireAuth,
        HttpClient,
        HttpHandler
      ]
    });
    TestBed.overrideComponent(CloneComponent, {
      set: {
        providers: [
          {provide: AuthService, useClass: MockAuthService},
          {provide: Router, useValue: routerSpy}
        ]
      }
    });
    fixture = TestBed.createComponent(CloneComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

