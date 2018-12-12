import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';
import {ImportDto} from '../dto/import.dto';
import {IssueDto} from '../dto/issueDto';
import {IssuerequestDto} from '../dto/issuerequest.dto';

@Injectable({
  providedIn: 'root'
})
export class CloneService {
  res;

  constructor(private github: GithubService) {
  }

  async cloneProject(auth: Authdata, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    await this.github.persistRepository(auth.token, request._repositoryName + '-' + auth.username)
      .then(async Reporesponse => {
        if (Reporesponse != null) {
          console.log('data is ready');
          const impStarted = await this.github.importRepository
          (auth.token, auth.username, request._repositoryName, new ImportDto(request._URL))
            .toPromise();
          if (impStarted != null) {
          }
          console.log(JSON.stringify(request._issues));
          for (const issue in request._issues) {
            if (issue != null) {
              const data = new IssuerequestDto(request._issues[issue]._body, request._issues[issue]._number, request._issues[issue]._title);
              const i = await this.github.persistIssue(auth.token, auth.username, request._repositoryName + '-' + auth.username, data);
              console.log(i);
            }
          }
        }
      });
  }
}



