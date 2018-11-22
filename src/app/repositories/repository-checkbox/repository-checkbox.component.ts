import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-repository-checkbox',
  templateUrl: './repository-checkbox.component.html',
  styleUrls: ['./repository-checkbox.component.sass']
})
export class RepositoryCheckboxComponent implements OnInit {

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

  doeietsmoois(iets: String){
    this.geefAlleRepositories = false;
    this.chosenRepository = iets;
  }

  getRepository(){
    return this.chosenRepository;
  }

}
