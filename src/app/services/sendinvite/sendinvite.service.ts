import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {sha256} from "js-sha256";

@Injectable({
  providedIn: 'root'
})
export class SendinviteService {
  private _hash: string;

  constructor(private _db: AngularFirestore) {
  }

  hashRandomString(randomString: string) {
    this._hash = sha256(randomString);
    return this._hash;
  }

  pushToDatabase(randomString: string, repo: string) {
    this._db.collection('request')
      .doc(this.hashRandomString(randomString))
      .set(JSON.parse(JSON.stringify({'URL': 'https://github.com/' + repo})));
  }

  async getData(randomString: string) {
    let checkValidation = false;
    await this._db.collection('request')
      .doc(this.hashRandomString(randomString))
      .ref
      .get().then(function (doc) {
        if (doc.exists) {
          checkValidation = true;
        }
      }).catch(function (error) {
        console.log('Error getting document:', error);
      });
    return checkValidation;
  }

}
