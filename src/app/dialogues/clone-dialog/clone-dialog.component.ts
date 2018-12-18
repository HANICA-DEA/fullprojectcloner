import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.sass']
})

export class CloneDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
