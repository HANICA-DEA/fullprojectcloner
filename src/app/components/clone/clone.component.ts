import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {DatabaseService} from '../../services/database/database.service';
import {SendinviteService} from '../../services/sendinvite/sendinvite.service';
import {CloneService} from '../../services/clone/clone.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';
import {MatSnackBar} from '@angular/material';

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
  cloneButtonClicked = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private databaseService: DatabaseService,
              private sendInviteService: SendinviteService, private cloneService: CloneService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.cloneID = event.cloneID;
    });
    this.initialiseRequestData();
    this.initialiseAuth();
  }

  clone() {
    this.cloneButtonClicked = true;
    this.cloneService.cloneProject(this.authData, this.requestData);
    this.snackBar.open('Cloning project right now, you will receive an e-mail from GitHub when your project is ready', '', {
      duration: 10000,
      verticalPosition: 'top'
    });
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
