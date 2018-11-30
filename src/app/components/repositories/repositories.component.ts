import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {AuthService} from '../../services/auth/auth.service';
import {Headers, Http} from '@angular/http';
import {InviteFormDto} from '../../services/dto/inviteform.dto';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})

export class RepositoriesComponent implements OnInit {

  repositories: any;
  public searchedUserExists: boolean;
  public data: DataService;
  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/{{{{{vulhieronsidinvanhetscript}}}}}/exec';
  private inviteFormDto: InviteFormDto;

  constructor(data: DataService, public authService: AuthService, private http: Http) {
    this.data = data;
  }

  ngOnInit() {
    this.data.getrepositories().subscribe(data => {
      this.repositories = data;
    });
  }

  doesUserExist(username: string) {
    this.data.getUser(username).subscribe(data => {
      this.searchedUserExists = true;
    }, err => {
      this.searchedUserExists = false;
    });
  }


  sendInviteToUser(emailaddress: string) {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.inviteFormDto = new InviteFormDto(emailaddress);
    this.http.post(this.INVITEMAIL_SCRIPT_URL, this.inviteFormDto, {headers: headers})
      .subscribe((response) => {
        console.log(response);
      });
  }

}


