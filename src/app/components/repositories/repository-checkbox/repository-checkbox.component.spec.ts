import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryCheckboxComponent } from './repository-checkbox.component';

describe('RepositoryCheckboxComponent', () => {
  let component: RepositoryCheckboxComponent;
  let fixture: ComponentFixture<RepositoryCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryCheckboxComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
