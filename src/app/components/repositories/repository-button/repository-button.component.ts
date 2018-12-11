import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GithubService} from '../../../services/github/github.service';
import {AuthdataDto} from '../../../services/dto/authdata.dto';

@Component({
  selector: 'app-repository-button',
  templateUrl: './repository-button.component.html',
  styleUrls: ['./repository-button.component.sass']
})
export class RepositoryButtonComponent implements OnInit {

  @Input() repositories: Object;
  @Input() data: GithubService;
  @Input() authData: AuthdataDto;
  public showAllRepositories: Boolean;
  chosenRepository: String;

  checkboxForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.checkboxForm = this.formBuilder.group({});
    this.showAllRepositories = true;
    this.chosenRepository = null;


  }

  ngOnInit() {
  }

  chooseRepository(repositoryName: String) {
    this.showAllRepositories = false;
    this.chosenRepository = repositoryName;
  }

  setShowAllRepositories(showAllRepositories: boolean) {
    this.showAllRepositories = showAllRepositories;
  }
}
