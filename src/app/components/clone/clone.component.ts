import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {GithubService} from '../../services/github/github.service';
import {DatabaseService} from '../../services/database/database.service';
import {SendinviteService} from '../../services/sendinvite/sendinvite.service';
import {CloneService} from '../../services/clone/clone.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';

@Component({
  selector: 'app-cloneinvite',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.sass']
})
export class CloneComponent implements OnInit {

  cloneID: string;
  issues: Object;
  requestData: Object;
  authData: AuthdataDto;

  constructor(private route: ActivatedRoute, public authService: AuthService, private databaseService: DatabaseService,
              private sendInviteService: SendinviteService, private cloneService: CloneService) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
    this.initialiseRequestData();
    this.initialiseAuth();
  }

  clone() {
    this.cloneService.cloneProject(this.authData, this.requestData);
  }

  async initialiseRequestData() {
    this.requestData = await this.databaseService.getData('request', this.sendInviteService.hashRandomString(this.cloneID));
  }

  private initialiseAuth() {
    this.authService.user.subscribe(async user => {
      if (user) {
        const document = await this.databaseService.getData('user', this.authService.userDetails.uid);
        this.authData = new AuthdataDto(document._username, document._token);
      }
    });
  }
}
