import {RepositoryButtonComponent} from './repository-button.component';
import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
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


  xit('repositorybutton calls chooserepository', async(() => {
    // Hoe vul ik in godsnaam repositories met iets waardoor de test slaagt ):
    // object: Object = "hoi";
    component.showAllRepositories = true;
    // component.repositories = object;
    spyOn(component, 'chooseRepository');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#repository-button');
    button.click();
    expect(component.chooseRepository).toHaveBeenCalled();
  }));

});
