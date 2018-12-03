import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CloneinviteComponent} from './cloneinvite.component';

describe('CloneinviteComponent', () => {
  let component: CloneinviteComponent;
  let fixture: ComponentFixture<CloneinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloneinviteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
