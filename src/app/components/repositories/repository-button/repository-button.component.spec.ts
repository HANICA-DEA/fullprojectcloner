import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RepositoryButtonComponent} from './repository-button.component';

describe('RepositoryButtonComponent', () => {
  let component: RepositoryButtonComponent;
  let fixture: ComponentFixture<RepositoryButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
