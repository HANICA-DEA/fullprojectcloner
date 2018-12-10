import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {AuthService} from '../../services/auth/auth.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';
import {DatabaseService} from '../../services/database/database.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  repositories: Object;
  authData: AuthdataDto;

  constructor(private data: DataService, public authService: AuthService, private dbService: DatabaseService) {
  this.data = data;
  }

  async ngOnInit() {
    this.initialiserepos();

  }

  async initialiserepos() {
    this.authService.user.subscribe(async user => {
      if (user) {
        const document = await this.dbService.getData('user', this.authService.userDetails.uid);
        this.authData = new AuthdataDto(document._username, document._token);
        this.data.getRepositories(this.authData.token, this.authData.username)
          .subscribe(data => {
            this.repositories = data;
          });
      }
    });
  }

  repoInfoReady() {
    return this.repositories != null && this.authData != null;
  }
}
