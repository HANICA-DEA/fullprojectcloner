import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CloneDialogComponent} from "./cloneDialog.component";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CloneDialogComponent', () => {
  let component: CloneDialogComponent;
  let fixture: ComponentFixture<CloneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CloneDialogComponent
      ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: MatDialogTitle, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []}]
    });
    fixture = TestBed.createComponent(CloneDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
