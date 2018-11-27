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

  constructor(private data: DataService, public authService: AuthService, private dbService: DatabaseService) { }

  ngOnInit() {
    this.dbService.getFromDatabase('user', this.authService.userDetails.uid).subscribe(data => {
      this.authData = data;
    });
    this.data.getrepositories(this.authService.token, this.authService.username).subscribe(data => {
      this.repositories = data;
    });
    }
}

