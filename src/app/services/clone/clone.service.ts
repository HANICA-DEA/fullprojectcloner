import {Injectable} from '@angular/core';
import {DataService} from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private data: DataService) { }
  cloneProject(requestData: Object) {
  //
  }

  // function to load request data from firestore
  // function to create empty repository
  // function to clone existing repository
  // if issues == true
  // GetissuesfromFirestore
  // for loop voor issues
  // post issue in github
}

