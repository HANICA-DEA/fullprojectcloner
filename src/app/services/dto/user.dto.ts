import {ProviderdataDto} from './providerdata.dto';
import {StsTokenManager} from './ststokenmanager.dto';


export class UserDto {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  isAnonymous: boolean;
  providerData: ProviderdataDto[];
  apiKey: string;
  appName: string;
  authDomain: string;
  stsTokenManager: StsTokenManager;
  redirectEventId: number;
  lastLoginAt: string;
  createdAt: string;
}
