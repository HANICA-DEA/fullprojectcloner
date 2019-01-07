import {GithubService} from './github.service';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {async} from 'q';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {fail} from 'assert';

describe('GithubService', () => {
  let sut: GithubService;
  let httpMock: HttpTestingController;
  const httpResponseMock = [
    {title: 'test', body: 'data'}
  ];

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
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';

      sut.getRepositories(token, username).subscribe(repository => {
          expect(<any>repository).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl + '/users/' + username + '/repos?access_token=' + token);
      expect(req.request.method).toBe('GET');
      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';

      const mockErrorResponse = {message: 'bad request'};
      sut.getRepositories(token, username).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl + '/users/' + username + '/repos?access_token=' + token);
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#getRepositoryIssues', () => {
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      sut.getRepositoryIssues(token, username, repository).subscribe(issues => {
          expect(<any>issues).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);
      expect(req.request.method).toBe('GET');
      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      const mockErrorResponse = {message: 'bad request'};
      sut.getRepositoryIssues(token, username, repository).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#importRepository', () => {
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      sut.importRepository(token, username, repository, {}).subscribe(resp => {
          expect(<any>resp).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl +
        '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token);

      expect(req.request.method).toBe('PUT');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');

      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      const mockErrorResponse = {message: 'bad request'};
      sut.importRepository(token, username, repository, {}).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl +
        '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token);

      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#persistIssue', () => {

    it('should resolve promise', done => {
        const username = 'Kevin';
        const token = 'abc';
        const repository = 'repo';
        sut.persistIssue(token, username, repository, {}).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistIssue(token, username, repository, {});

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);

      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
});


