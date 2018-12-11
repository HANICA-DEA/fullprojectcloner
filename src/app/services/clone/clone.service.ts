import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private data: GithubService) { }
  cloneProject(requestData: Object) {
  console.log('iets');
  }

  // function to load request data from firestore
  // function to create empty repository
  // function to clone existing repository
  // if issues == true
  // GetissuesfromFirestore
  // for loop voor issues
  // post issue in github
}

