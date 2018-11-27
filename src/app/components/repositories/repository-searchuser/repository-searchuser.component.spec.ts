import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorySearchuserComponent } from './repository-searchuser.component';

describe('RepositorySearchuserComponent', () => {
  let component: RepositorySearchuserComponent;
  let fixture: ComponentFixture<RepositorySearchuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorySearchuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorySearchuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
