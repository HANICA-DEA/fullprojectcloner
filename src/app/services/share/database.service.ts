import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserDto} from '../dto/user.dto';
import {Observable} from 'rxjs';
import {AuthdataDto} from '../dto/authdata.dto';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private tokencollection: AngularFirestoreCollection<AuthdataDto>;
  private token: Observable<AuthdataDto>;

  constructor(private afs: AngularFirestore) {
  }

  pushToDatabase(subject: string, key: string, object: Object) {
    this.afs.collection(subject).doc(key).set(JSON.parse(JSON.stringify(object)));
  }

   getFromDatabase(subject: string, key: string): Observable <any> {
   let docdata = null;
    this.afs.collection(subject)
      .doc(key).ref.get().then(function(doc) {
      if (doc.exists) {
        docdata = doc.data();
        console.log(docdata._username);
      } else {
        console.log('No such document!');
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
    });
    return docdata;
  }
}
