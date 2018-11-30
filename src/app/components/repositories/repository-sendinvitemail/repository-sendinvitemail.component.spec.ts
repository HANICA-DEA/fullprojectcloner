import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendinvitemailComponent } from './repository-sendinvitemail.component';

describe('SendinvitemailComponent', () => {
  let component: SendinvitemailComponent;
  let fixture: ComponentFixture<SendinvitemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendinvitemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendinvitemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
