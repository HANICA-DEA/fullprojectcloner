import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-repository-searchuser',
  templateUrl: './repository-searchuser.component.html',
  styleUrls: ['./repository-searchuser.component.sass']
})
export class RepositorySearchuserComponent implements OnInit {
  @Input() chosenRepository: String;
  @Input() data: DataService;
  searchForm: FormGroup;
  public searchedUserExists: boolean;
  @Output() valueChange = new EventEmitter();
  goBackValue: boolean;
  searchedUser: String = '';




  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({});

  }

  ngOnInit() {
  }

  doesUserExist(username: string) {
    this.searchedUser = username;
    this.data.getUser(username).subscribe(data => {
      this.searchedUserExists = true;
    }, err => {
      this.searchedUserExists = false;
    });
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }
}
