import {GithubService} from './github.service';
import {TestBed} from '@angular/core/testing';
import {async} from 'q';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GithubService', () => {
  let sut: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService],
      imports: [HttpClientTestingModule]
    });

    sut = TestBed.get(GithubService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getRepositories', () => {
    it('should return an Observable', function () {
      
    });
  });
});



