import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {AuthService} from '../../services/auth/auth.service';
import {DatabaseService} from '../../services/share/database.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  repositories: Object;
  authData: AuthdataDto;
  loggedin: boolean;

  constructor(private data: DataService, public authService: AuthService, private dbService: DatabaseService) {
  }
  ngOnInit() {
    this.authService.user.subscribe(auth => {
      if (auth) {
        this.dbService.getFromDatabase('user', this.authService.userDetails.uid).subscribe(result => {
          this.authData = new AuthdataDto(result._username, result._token );  });
        if (this.authData) {
        this.data.getrepositories(this.authData.token, this.authData.username).subscribe(data => {
          this.repositories = data;
        });
        }}
    });
  }
}

