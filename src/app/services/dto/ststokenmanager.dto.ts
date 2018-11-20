export class StsTokenManager {
  private _apiKey: string;
  private _refreshToken: string;
  private _accessToken: string;
  private _expirationTime: number;


  constructor(apiKey: string, refreshToken: string, accessToken: string, expirationTime: number) {
    this._apiKey = apiKey;
    this._refreshToken = refreshToken;
    this._accessToken = accessToken;
    this._expirationTime = expirationTime;
  }


  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get expirationTime(): number {
    return this._expirationTime;
  }

  set expirationTime(value: number) {
    this._expirationTime = value;
  }
}

