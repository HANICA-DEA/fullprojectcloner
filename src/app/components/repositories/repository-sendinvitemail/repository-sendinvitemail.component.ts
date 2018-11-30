import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sendinvitemail',
  templateUrl: './repository-sendinvitemail.component.html',
  styleUrls: ['./repository-sendinvitemail.component.sass']
})
export class SendinvitemailComponent implements OnInit {
  @Input() searchedUser: String;

  constructor() {
  }

  ngOnInit() {
  }

  sendInviteMail() {
    console.log('email send to ' , this.searchedUser);
  }

}
