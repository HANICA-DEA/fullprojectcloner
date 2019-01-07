import {SidemenuComponent} from './sidemenu.component';
import {RepositoryButtonComponent} from '../repositories/repository-button/repository-button.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule} from '@angular/material';
import {RepositorySendinviteComponent} from '../repositories/repository-sendinvite/repository-sendinvite.component';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        SidemenuComponent,
      ]
    });

    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('empty test', () => {
    component.ngOnInit();
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(currentYear);
  });
});
