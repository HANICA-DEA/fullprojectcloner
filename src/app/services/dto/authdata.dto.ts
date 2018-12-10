export class AuthdataDto implements Authdata {
  public _token: String;
  public _username: string;

  constructor(username, token) {
    this._username = username;
    this._token = token;
  }

  public deserialize(input: any): AuthdataDto {
    this._username = input.username;
    this._token = input.token;

    return this;
  }


  get token(): String {
    return this._token;
  }

  set token(value: String) {
    this._token = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
