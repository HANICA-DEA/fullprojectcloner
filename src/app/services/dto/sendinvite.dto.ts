import {IssuesDto} from "./issues.dto";


export class SendinviteDto {
  private URL: string;
  private issues: Array<IssuesDto>;
  private username: string;
  private repositoryName: string;

  constructor(URL: string, issues: Array<IssuesDto>, username: string, repositoryName: string) {
    this.URL = URL;
    this.issues = issues;
    this.username = username;
    this.repositoryName = repositoryName;
  }
}
