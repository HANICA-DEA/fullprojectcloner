export class PostrequestDto {
  private name: string;
  private description: string;
  private homepage: string;
  private is_private: boolean;
  private has_issues: boolean;
  private has_projects: boolean;
  private has_wiki: boolean;

  constructor(name: string, description: string, homepage:
    string , is_private: boolean, has_issues: boolean, has_projects: boolean, has_wiki: boolean) {
    this.name = name;
    this.description = description;
    this.homepage = homepage;
    this.is_private = is_private;
    this.has_issues = has_issues;
    this.has_projects = has_projects;
    this.has_wiki = has_wiki;
  }
}
