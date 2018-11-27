import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-repository-checkbox',
  templateUrl: './repository-checkbox.component.html',
  styleUrls: ['./repository-checkbox.component.sass']
})
export class RepositoryCheckboxComponent implements OnInit {

  @Input() repositories: Object;
  @Input() data: DataService;
  public geefAlleRepositories: Boolean;
  chosenRepository: String;

  checkboxForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.checkboxForm = this.formBuilder.group({});
    this.geefAlleRepositories = true;
    this.chosenRepository = null;


  }

  ngOnInit() {
  }

  doeietsmoois(iets: String){
    this.geefAlleRepositories = false;
    this.chosenRepository = iets;
  }

  setGeefAlleRepositories(geefAlleRepositories: boolean){
    this.geefAlleRepositories = geefAlleRepositories;
  }

}
