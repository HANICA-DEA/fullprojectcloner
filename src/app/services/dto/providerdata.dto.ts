export class ProviderdataDto {
  private _uid: string;
  private _displayName: string;
  private _photoURL: string;
  private _email: string;
  private _phoneNumber: string;
  private _providerId: string;

  constructor(uid: string, displayName: string, photoURL: string, email: string, phoneNumber: string, providerId: string) {
    this._uid = uid;
    this._displayName = displayName;
    this._photoURL = photoURL;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._providerId = providerId;
  }

  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get photoURL(): string {
    return this._photoURL;
  }

  set photoURL(value: string) {
    this._photoURL = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get providerId(): string {
    return this._providerId;
  }

  set providerId(value: string) {
    this._providerId = value;
  }
}

