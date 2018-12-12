import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';
import {ImportDto} from '../dto/import.dto';
import {IssueDto} from '../dto/issueDto';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private github: GithubService) {
  }

  async cloneProject(auth: Authdata, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    console.log(request._repositoryName);
    console.log(auth.token);
    await this.github.persistRepository(auth.token, request._repositoryName + '-' + auth.username).subscribe();
    await this.github.importRepository(auth.token, auth.username, request._repositoryName, new ImportDto(request._URL));
    if (request._issues.length) {
      for (const issue in request._issues) {
        if (issue != null) {
          await this.github.persistIssue(auth.token, auth.username, request._repositoryName, issue);
        }
      }
      console.log('done');
    }
  }


  // if issues == true
  // GetissuesfromFirestore
  // for loop voor issues
  // post issue in github
}

