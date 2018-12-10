import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-cloneinvite',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.sass']
})
export class CloneComponent implements OnInit {

  cloneID: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
  }

}
