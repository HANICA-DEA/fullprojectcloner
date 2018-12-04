import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthdataDto} from '../dto/authdata.dto';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor(private afs: AngularFirestore) {
  }

  pushToDatabase(subject: string, key: string, object: Object): void {
    this.afs.collection(subject).doc(key).set(JSON.parse(JSON.stringify(object)));
  }

  async getData(subject: string, key: string): Promise<AuthdataDto> {
    const document = await this.afs.collection(subject).doc(key).ref.get();
    const docdata = document.data();
    const data = new AuthdataDto(docdata._username, docdata._token);
    return data;
  }
}
