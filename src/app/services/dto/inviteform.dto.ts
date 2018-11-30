export class InviteFormDto {
  email: string;
  url: string;

  constructor(email: string, url: string) {
    this.email = email;
    this.url = url;
  }
}


