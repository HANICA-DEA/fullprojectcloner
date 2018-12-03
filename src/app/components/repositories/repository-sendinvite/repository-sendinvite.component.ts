import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../../services/dto/inviteform.dto';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-repository-sendinvite',
  templateUrl: './repository-sendinvite.component.html',
  styleUrls: ['./repository-sendinvite.component.sass']
})
export class RepositorySendinviteComponent implements OnInit {
  @Input() chosenRepository: string;
  @Input() data: DataService;
  searchForm: FormGroup;
  @Output() valueChange = new EventEmitter();
  goBackValue: boolean;

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;
  private inviteID: number;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: Http, public authService: AuthService) {
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

  sendInviteMail(searchedUser: string) {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    if (this.searchForm.valid) {
      this.inviteID = 1;
      this.sendInviteToUser(
        searchedUser,
        'http://localhost:4200/clone/' + this.inviteID,
        this.chosenRepository,
        this.chosenRepository.split('/')[0]
      );
      this.searchForm.reset();
      Object.keys(this.searchForm.controls).forEach(key => {
        this.searchForm.controls[key].setErrors(null);
      });
    }

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
