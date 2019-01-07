import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';
import {ImportDto} from '../../entities/github/import.dto';
import {IssuerequestDto} from '../../entities/github/issuerequest.dto';
import {AuthdataDto} from '../../entities/auth/authdata.dto';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private github: GithubService) {
  }

  async cloneProject(auth: AuthdataDto, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    // Maakt de repository aan

    await this.github.persistRepository(auth.token, request._repositoryName + '-' + auth.username)
      .then(async Reporesponse => {

        if (Reporesponse != null) {
          const impStarted = await this.github.importRepository
          (auth.token, auth.username, request._repositoryName, new ImportDto(request._URL))
            .toPromise();

          for (const issue in request._issues) {
            if (issue != null) {
              const data = new IssuerequestDto(request._issues[issue]._body, request._issues[issue]._number, request._issues[issue]._title);
              await this.github.persistIssue(auth.token, auth.username, request._repositoryName + '-' + auth.username, data);
            }
          }
        }
      });
  }
}



