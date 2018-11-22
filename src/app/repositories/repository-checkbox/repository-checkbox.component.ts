import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-repository-checkbox',
  templateUrl: './repository-checkbox.component.html',
  styleUrls: ['./repository-checkbox.component.sass']
})
export class RepositoryCheckboxComponent implements OnInit {

  @Input() repositories: Object;

  constructor() { }

  ngOnInit() {
  }

}
