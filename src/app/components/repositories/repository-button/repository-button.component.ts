import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-repository-button',
  templateUrl: './repository-button.component.html',
  styleUrls: ['./repository-button.component.sass']
})
export class RepositoryButtonComponent implements OnInit {

  @Input() repositories: Object;
  checkboxForm: FormGroup;
  geefAlleRepositories: Boolean;
  chosenRepository: String;

  constructor(private formBuilder: FormBuilder) {
    this.geefAlleRepositories = true;
    this.chosenRepository = null;
    this.checkboxForm = this.formBuilder.group({

    });
  }

  ngOnInit() {
  }

  doeietsmoois(iets: String) {
    this.geefAlleRepositories = false;
    this.chosenRepository = iets;
  }

  getRepository() {
    return this.chosenRepository;
  }

}
