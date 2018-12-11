import { Injectable } from '@angular/core';
import {DataService} from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private data: DataService) { }
  cloneProject(requestData: Object) {
  //
  }
}

