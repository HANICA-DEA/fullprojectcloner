import {RepositoryButtonComponent} from './repository-button.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepositorySendinviteComponent} from '../repository-sendinvite/repository-sendinvite.component';
import {MatCardModule, MatFormFieldModule} from '@angular/material';

describe('RepositoryButtonComponent', () => {
  let component: RepositoryButtonComponent;
  let fixture: ComponentFixture<RepositoryButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule
      ],
      declarations: [
        RepositoryButtonComponent,
        RepositorySendinviteComponent
      ]
    });

    fixture = TestBed.createComponent(RepositoryButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
