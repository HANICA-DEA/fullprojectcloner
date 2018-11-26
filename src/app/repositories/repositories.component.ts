import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data/data.service';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})

export class RepositoriesComponent implements OnInit {

  repositories: any;

  private searchedUserExists: boolean;

  constructor(private data: DataService, public authService: AuthService) {
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

}


