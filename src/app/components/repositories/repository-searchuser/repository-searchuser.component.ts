import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../../services/dto/inviteform.dto';

@Component({
  selector: 'app-repository-searchuser',
  templateUrl: './repository-searchuser.component.html',
  styleUrls: ['./repository-searchuser.component.sass']
})
export class RepositorySearchuserComponent implements OnInit {
  @Input() chosenRepository: String;
  @Input() data: DataService;
  searchForm: FormGroup;
  @Output() valueChange = new EventEmitter();
  goBackValue: boolean;

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;

  constructor(private formBuilder: FormBuilder, private http: Http) {
    this.searchForm = this.formBuilder.group({});

  }

  ngOnInit() {
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }

  sendInviteMail(searchedUser: string) {
    console.log('email send to ' , searchedUser);
    this.sendInviteToUser(searchedUser, 'http://localhost:4200/test');

  }

  sendInviteToUser(emailaddress: string, url: string) {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.inviteFormDto = new InviteFormDto(emailaddress, url);
    this.http.post(this.INVITEMAIL_SCRIPT_URL, this.inviteFormDto, {headers: headers})
      .subscribe((response) => {
        console.log(response);
      });
  }
}
