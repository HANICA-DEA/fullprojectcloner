export class IssuesDto {
  private number: number;
  private title: string;
  private body: string;

  constructor(number: number, URL: string, body: string) {
    this.number = number;
    this.title = URL;
    this.body = body;
  }
}
