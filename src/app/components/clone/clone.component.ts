import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cloneinvite',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.sass']
})
export class CloneComponent implements OnInit {

  private cloneID: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
  }

}
