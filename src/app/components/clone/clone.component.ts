import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-cloneinvite',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.sass']
})
export class CloneComponent implements OnInit {

  cloneID: string;
  issues: Object;

  constructor(private route: ActivatedRoute, public authService: AuthService, private data: DataService) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
  }

  clone() {


    console.log('Clone: ' + this.cloneID);
  }

}
