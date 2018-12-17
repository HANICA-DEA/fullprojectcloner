import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CloneComponent} from './clone.component';
import {MatCardModule} from '@angular/material';
import {LoginComponent} from '../login/login.component';

describe('CloneComponent', () => {
  let component: CloneComponent;
  let fixture: ComponentFixture<CloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloneComponent],
      imports: [MatCardModule, LoginComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
