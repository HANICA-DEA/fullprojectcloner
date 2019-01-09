import {TestBed} from '@angular/core/testing';

import {DatabaseService} from './database.service';
import {GithubService} from '../github/github.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoginComponent} from '../../components/login/login.component';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

export class AngularFireStoreMock {

}

describe('DatabaseService', () => {

  let sut: DatabaseService;
  let angularFireStoreMock: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService, AngularFirestore],
      imports: [HttpClientTestingModule]
    });
    TestBed.overrideComponent(LoginComponent, {
      set: {
        providers: [
          {provide: AngularFirestore, useClass: AngularFireStoreMock},
        ]
      }
    });

    sut = TestBed.get(DatabaseService);
    angularFireStoreMock = TestBed.get(AngularFirestore);
  });
  describe('pushToDatabase', function () {
    xit('should receive right input', function () {

    });
  });
});
