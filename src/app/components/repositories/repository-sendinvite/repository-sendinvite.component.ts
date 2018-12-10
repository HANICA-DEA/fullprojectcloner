import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../../services/dto/inviteform.dto';
import {AuthService} from '../../../services/auth/auth.service';
import {sha256} from 'js-sha256';
import {AngularFirestore} from 'angularfire2/firestore';

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
  hash: string;
  submitted = false;
  private inviteID: string;

  constructor(private db: AngularFirestore, private formBuilder: FormBuilder, private http: Http, public authService: AuthService,
  ) {

    this.searchForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit() {
  }

  static randomStringGenerator() {
    return Math.random().toString(36).substring(7);
  }

  pushToDatabase(randomString: string) {
    this.db.collection("request").doc(this.hashRandomString(randomString)).set(JSON.parse(JSON.stringify({'URL': 'HIER KOMT EEN URL'})));
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }

  async getData(randomString: string) {
    let checkValidation = false;
    await this.db.collection("request")
      .doc(this.hashRandomString(randomString))
      .ref
      .get().then(function (doc) {
        if (doc.exists) {
          checkValidation = true;
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    return checkValidation;
  }

  hashRandomString(randomString: string) {
    this.hash = sha256(randomString);
    return this.hash;
  }

  inviteIdGenerator(): string {
    this.inviteID = RepositorySendinviteComponent.randomStringGenerator();
    if (this.getData(this.inviteID)) {
      this.inviteID = RepositorySendinviteComponent.randomStringGenerator();
    } else if (!this.getData(this.inviteID)) {
      return this.inviteID;
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
      this.pushToDatabase(this.hashRandomString(this.inviteID));
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
