import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
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

  // getFromDatabase(subject: string, key: string): Observable<AuthdataDto> {
  //   let data;
  //   this.afs.collection(subject)
  //     .doc(key).ref.get().then(function (doc) {
  //     if (doc.exists) {
  //       const docdata = doc.data();
  //       data = new AuthdataDto(docdata._username, docdata._token);
  //       console.log(data._username + ' 5');
  //       return data;
  //     } else {
  //       console.log('No such document!');
  //     }
  //   }).catch(function (error) {
  //     console.log('Error getting document:', error);
  //   });
  //   return null;
  // }

  async getData(subject: string, key: string): AuthdataDto {
    let document = await this.afs.collection(subject).doc(key).ref.get();
    const docdata = document.data();
    let data = new AuthdataDto(docdata._username, docdata._token);
    console.log(data._username + ' 5');
    return data;
  }
}
