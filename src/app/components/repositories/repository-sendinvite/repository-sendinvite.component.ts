import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {GithubService} from '../../../services/github/github.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../../services/dto/inviteform.dto';
import {AuthService} from '../../../services/auth/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {SendinviteService} from '../../../services/sendinvite/sendinvite.service';
import {AuthdataDto} from '../../../services/dto/authdata.dto';
import {IssueDto} from '../../../services/dto/issueDto';
import {MatSnackBar} from '@angular/material';
import {SendinviteDto} from '../../../services/dto/sendinvite.dto';

@Component({
  selector: 'app-repository-sendinvite',
  templateUrl: './repository-sendinvite.component.html',
  styleUrls: ['./repository-sendinvite.component.sass']
})
export class RepositorySendinviteComponent implements OnInit {
  @Input() data: GithubService;
  @Input() chosenRepository: string;
  @Input() authData: AuthdataDto;
  @Output() valueChange = new EventEmitter();
  singleRecipientForm: FormGroup;
  multiRecipientForm: FormGroup;
  goBackValue: boolean;
  formSent: boolean;
  submitted: boolean;
  issues: Array<IssueDto> = [];

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;
  private inviteID: string;
  private singleValidator: boolean;
  private multiValidator: boolean;
  csvNewContent: string;

  constructor(private sendInviteData: SendinviteService, private db: AngularFirestore,
              private formBuilder: FormBuilder, private http: Http, public snackBar: MatSnackBar,
              public authService: AuthService, private githubService: GithubService,
  ) {
    this.singleRecipientForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.githubService.getRepositoryIssues(this.authData.token, this.authData.username, this.chosenRepository.split('/')[1])
      .subscribe(data => {
        this.initialiseIssues(data);
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  initialiseIssues(issues: object) {
    const issueObject = JSON.parse(JSON.stringify(issues));
    for (const issue of issueObject) {
      this.issues.push(new IssueDto(issue.number, issue.title, issue.body));
    }
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

  sendToSelector(searchedUser: string) {
    let recipient: string;

    this.submitted = true;
    this.formSent = false;
    if (this.singleRecipientForm.invalid) {
      return;
    } else if (this.singleRecipientForm.valid) {
      this.singleValidator = true;
    } else if (this.multiRecipientForm.valid) {
      this.multiValidator = true;
    }

    if (this.singleValidator) {
      recipient = searchedUser;
      this.sendInviteMail(recipient);
    } else if (this.multiValidator) {
      recipient = this.csvNewContent;
      this.sendInviteMail(recipient);
    }
  }

  private sendInviteMail(recipient: string) {
    this.sendInviteToUser(
      recipient,
      'http://localhost:4200/clone/' + this.inviteIdGenerator(),
      this.chosenRepository,
      this.chosenRepository.split('/')[0]
    );
    this.sendInviteData.pushToDatabase(this.inviteID,
      new SendinviteDto(
        'https://github.com/' + this.authData.username + '/' + this.chosenRepository.split('/')[1],
        this.issues,
        this.authData.username,
        this.chosenRepository.split('/')[1]
      ));
    this.openSnackBar('Request has been sent!', 'close');
    this.singleRecipientForm.reset();
    this.formGroupDirective.resetForm();
    this.formSent = true;
  }

  private randomStringGenerator() {
    return Math.random().toString(36).substring(7);
  }

  sendInviteToUser(emailaddress: string, url: string, repositoryname: string, invitator: string) {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.inviteFormDto = new InviteFormDto(emailaddress, url, repositoryname, invitator);
    this.http.post(this.INVITEMAIL_SCRIPT_URL, this.inviteFormDto, {headers: headers})
      .subscribe((response) => {
      });
  }

  onFileLoad(fileLoadedEvent) {
    let csvContent = fileLoadedEvent.target.result;
    let re = /;/gi;
    this.csvNewContent = csvContent.toString().replace(re, ",");
    alert('The given recipients are: \n\n' + this.csvNewContent + '\n\nPlease check if this is correct and correct your input if needed.');
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad.bind(this);
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }
}
