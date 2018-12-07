import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-repository-button',
  templateUrl: './repository-button.component.html',
  styleUrls: ['./repository-button.component.sass']
})
export class RepositoryButtonComponent implements OnInit {

  @Input() repositories: Object;
  @Input() data: DataService;
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
