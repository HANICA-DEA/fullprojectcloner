import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../../services/dto/inviteform.dto';
import {AuthService} from '../../../services/auth/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {SendinviteService} from "../../../services/sendinvite/sendinvite.service";
import {AuthdataDto} from '../../../services/dto/authdata.dto';

@Component({
  selector: 'app-repository-sendinvite',
  templateUrl: './repository-sendinvite.component.html',
  styleUrls: ['./repository-sendinvite.component.sass']
})
export class RepositorySendinviteComponent implements OnInit {
  @Input() data: DataService;
  @Input() chosenRepository: string;
  @Input() authData: AuthdataDto;
  searchForm: FormGroup;
  @Output() valueChange = new EventEmitter();
  goBackValue: boolean;

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;
  submitted = false;
  private inviteID: string;

  constructor(private sendInviteData: SendinviteService, private db: AngularFirestore,
              private formBuilder: FormBuilder, private http: Http, public authService: AuthService, private dataService: DataService,
  ) {
    this.searchForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }

  inviteIdGenerator(): string {
    this.inviteID = this.randomStringGenerator();
    if (this.sendInviteData.getData(this.inviteID)) {
      this.inviteID = this.randomStringGenerator();
    }
    return this.inviteID;
  }

  sendInviteMail(searchedUser: string) {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }
    if (this.searchForm.valid) {
      this.sendInviteToUser(
        searchedUser,
        'http://localhost:4200/clone/' + this.inviteIdGenerator(),
        this.chosenRepository,
        this.chosenRepository.split('/')[0]
      );
      this.dataService.getRepositoryIssues(this.authData.token, this.authData.username, this.chosenRepository )
      this.sendInviteData.pushToDatabase(this.sendInviteData.hashRandomString(this.inviteID), this.chosenRepository, null);
      this.searchForm.reset();
      Object.keys(this.searchForm.controls).forEach(key => {
        this.searchForm.controls[key].setErrors(null);
      });
    }
  }

  private randomStringGenerator() {
    return Math.random().toString(36).substring(7);
  }

  sendInviteToUser(emailaddress: string, url: string, repositoryname: string, invitator: string) {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.inviteFormDto = new InviteFormDto(emailaddress, url, repositoryname, invitator);
    this.http.post(this.INVITEMAIL_SCRIPT_URL, this.inviteFormDto, {headers: headers})
      .subscribe((response) => {
        console.log(response);
      });
  }
}
