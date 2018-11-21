import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data/data.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  repositories: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getrepositories().subscribe(data => {
      this.repositories = data;
    });
  }

}

