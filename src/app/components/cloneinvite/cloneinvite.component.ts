import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cloneinvite',
  templateUrl: './cloneinvite.component.html',
  styleUrls: ['./cloneinvite.component.sass']
})
export class CloneinviteComponent implements OnInit {

  private cloneID: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
  }

}
