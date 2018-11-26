import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserDto} from '../dto/user.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  usercol: AngularFirestoreCollection<any>;
  private Users: Observable<any>;
  constructor(private afs: AngularFirestore) {
  }

  pushToDatabase(subject: string, key: string, object: Object) {
    this.afs.collection(subject).doc(key).set({'title': key, 'content': JSON.parse(JSON.stringify(object))});
  }

  getFromDatabase(subject: string, key: string) {
    return this.afs.doc(subject + '/' + key).collection('content').valueChanges();
  }
}
