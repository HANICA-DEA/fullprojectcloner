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
  @Output() valueChange = new EventEmitter();
  goBackValue: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({});

  }

  ngOnInit() {
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }

  sendInviteMail(searchedUser: String) {
    console.log('email send to ' , searchedUser);
  }
}
