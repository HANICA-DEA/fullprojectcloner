import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CloneComponent} from './clone.component';
import {MatCardModule, MatExpansionModule} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AboutComponent} from '../about/about.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CloneComponent', () => {
  let component: CloneComponent;
  let fixture: ComponentFixture<CloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AboutComponent
      ]
    });

    fixture = TestBed.createComponent(CloneComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
