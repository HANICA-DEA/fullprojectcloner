import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {CsvDialogComponent} from "./csvDialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CsvDialogComponent', () => {
  let component: CsvDialogComponent;
  let fixture: ComponentFixture<CsvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CsvDialogComponent
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
    fixture = TestBed.createComponent(CsvDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
