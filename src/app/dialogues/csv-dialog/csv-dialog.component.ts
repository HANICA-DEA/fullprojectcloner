import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RepositorySendinviteComponent} from "../../components/repositories/repository-sendinvite/repository-sendinvite.component";


@Component({
  templateUrl: './csv-dialog.component.html',
  styleUrls: ['./csv-dialog.component.sass']
})

export class CsvDialogComponent {

  repositorySendinviteComponent: RepositorySendinviteComponent;

  constructor(
    public dialogRef: MatDialogRef<CsvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
    this.repositorySendinviteComponent.sendToSelector(null)
  }

}
