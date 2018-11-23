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
  postsCol: AngularFirestoreCollection<UserDto>;
  private Users: Observable<UserDto>;
  constructor(private afs: AngularFirestore) {
  }

  pushToDatabase(title: string, object: Object) {
    this.afs.collection('users').doc('kevin').set({'title': 'test', 'content': JSON.parse(JSON.stringify(object))});
  }
}
