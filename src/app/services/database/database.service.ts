import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
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

  async getData(subject: string, key: string): Promise<firebase.firestore.DocumentData> {
    const document = await this.afs.collection(subject).doc(key).ref.get();
    return document.data();
  }

  deleteData(subject: string, key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(subject).doc(key).delete().then(
        res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
