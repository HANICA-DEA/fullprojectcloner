import {GithubService} from './github.service';
import {TestBed} from '@angular/core/testing';
import {async} from 'q';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs';

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

    const data = [
      {title: 'test', body: 'data'}];
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getRepositories', () => {
    it('should return an Observable', function () {
      const response = sut.getRepositories('abc', 'Kevin').subscribe(repository => {
          expect(repository instanceof Observable);
        }
      );

      const req = httpMock.expectOne(`${sut.}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);

    });
  });
});



