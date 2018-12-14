import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  searchForm: FormGroup;
  goBackValue: boolean;
  issues: Array<IssueDto> = [];

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;
  submitted = false;
  private inviteID: string;
  private validator: boolean;
  csvNewContent: string;

  constructor(private sendInviteData: SendinviteService, private db: AngularFirestore,
              private formBuilder: FormBuilder, private http: Http, public snackBar: MatSnackBar,
              public authService: AuthService, private githubService: GithubService,
  ) {
    this.searchForm = this.formBuilder.group({
      email: ['', [Validators.email]]
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

  onSubmit() {
    this.submitted = true;
    this.validator = false;
    if (this.searchForm.invalid) {
      return;
    }
    if (this.searchForm.valid) {
      this.validator = true;
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

  sendInviteMail(searchedUser: string) {
    this.submitted = true;
    this.onSubmit();

    if (this.validator) {
      this.sendInviteToUser(
        this.csvNewContent,
        'http://localhost:4200/clone/' + this.inviteIdGenerator(),
        this.chosenRepository,
        this.chosenRepository.split('/')[0]
      );
      console.log(this.csvNewContent);
      this.sendInviteData.pushToDatabase(this.inviteID,
        new SendinviteDto(
          'https://github.com/' + this.authData.username + '/' +  this.chosenRepository.split('/')[1],
          this.issues,
          this.authData.username,
          this.chosenRepository.split('/')[1]
        ));
      this.openSnackBar('Request has been sent!', 'close');
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
