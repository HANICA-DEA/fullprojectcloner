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


  constructor(private data: DataService, public authService: AuthService, private dbService: DatabaseService) {
  this.data = data;
  }

  async ngOnInit() {
    this.initialiserepos();

  }

  async initialiserepos() {
    this.authService.user.subscribe(async user => {
      if (user) {
        this.authData = await this.dbService.getData('user', this.authService.userDetails.uid);
        this.data.getrepositories(this.authData.token, this.authData.username)
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
