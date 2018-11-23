import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private _af_db: AngularFireDatabase) {
  }

  // public af_PushObject(ref: String, object: any): firebase.database.ThenableReference {
  //   // return firebase.database().ref(ref).push(object);
  //
  //   const itemRef = this._af_db.object('item');
  //   itemRef.set({ name: 'javasampleapproach'});
  // }
  // public af_getData(ref: String): Object {
  //   return firebase.database().ref(ref).toJSON();
  // }
}
