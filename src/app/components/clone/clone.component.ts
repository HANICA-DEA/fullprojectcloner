import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {DatabaseService} from '../../services/database/database.service';
import {SendinviteService} from '../../services/sendinvite/sendinvite.service';
import {CloneService} from '../../services/clone/clone.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CloneDialogComponent} from "../../dialogues/clone-dialog/clone-dialog.component";

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
              private sendInviteService: SendinviteService, private cloneService: CloneService, public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: {
        requestData: this.requestData,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clone();
      } else {
        return;
      }
    });
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
    this.snackBar.open('Your project is being cloned, you will receive an e-mail when the project has successfully been cloned. This can take up to 5 minutes.', 'close', {
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
