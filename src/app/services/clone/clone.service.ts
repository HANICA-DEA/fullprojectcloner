import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';
import {ImportDto} from '../../entities/github/import.dto';
import {IssuerequestDto} from '../../entities/github/issuerequest.dto';
import {AuthdataDto} from '../../entities/auth/authdata.dto';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private readonly github: GithubService) {
  }

  async cloneFullProject(auth: AuthdataDto, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    const token = auth.token;
    const recipientName = auth.username;
    const senderName = request._username;
    const sourceReposioryName = request._repositoryName;
    const newRepositoryName = sourceReposioryName + '-' + recipientName;

    await this.github.persistRepository(token, newRepositoryName)
      .then(async Reporesponse => {
        if (Reporesponse != null) {
          await this.github.importRepository
          (token, recipientName, sourceReposioryName, new ImportDto(request._URL))
            .toPromise();
        }
      });
    const projects = await this.github.getProjects(token, senderName, sourceReposioryName).toPromise();

    let projectId: number;
    let columnId: number;
    let contentId: number;

    for (let projectCount = 0; projectCount < Object.keys(projects).length; projectCount++) {
      const projectContent = {name: projects[projectCount].name, body: projects[projectCount].body};
      await this.github.persistProject(token, recipientName, newRepositoryName, projectContent).then(async response => {
        console.log(response);
        projectId = JSON.parse(JSON.stringify(response)).id;
      });
      const columns = await this.github.getUsingUrl(token, projects[projectCount].columns_url).toPromise();
      for (let columnCount = 0; columnCount < Object.keys(columns).length; columnCount++) {
        const columnContent = {name: columns[columnCount].name};
        await this.github.persistColumn(token, projectId, columnContent).then(async response => {
          columnId = JSON.parse(JSON.stringify(response)).id;
        });
        const cards = await this.github.getUsingUrl(token, columns[columnCount].cards_url).toPromise();
        for (let cardCount = (Object.keys(cards).length - 1); cardCount > -1; cardCount--) {
          if (cards[cardCount].note === null) {
            const issue = await this.github.getUsingUrl(token, cards[cardCount].content_url).toPromise();
            const issueTitle = JSON.parse(JSON.stringify(issue)).title;
            const issueBody = JSON.parse(JSON.stringify(issue)).body;
            const issueContent = {title: issueTitle, body: issueBody};

            await this.github.persistIssue(token, recipientName, newRepositoryName, issueContent).then(async response => {
              contentId = JSON.parse(JSON.stringify(response)).id;
            });
            const cardsContent = {note: null, content_id: contentId, content_type: 'Issue'};
            await this.github.persistCard(token, columnId, cardsContent).then(async response => {
            });
          } else {
            const cardsContent = {note: cards[cardCount].note};
            await this.github.persistCard(token, columnId, cardsContent).then(async response => {
            });
          }
        }
      }
    }
  }
}



