import {ContactComponent} from './contact.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ContactComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Submit calls onSubmit()', async(() => {
    spyOn(component, 'onSubmit');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));
});
