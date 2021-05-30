import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../message/message.service';

export interface DialogDataAgenda {
  name: string;
}

@Component({
  selector: 'app-new-agenda-dialog',
  templateUrl: './new-agenda-dialog.component.html',
  styleUrls: ['./new-agenda-dialog.component.scss']
})
export class NewAgendaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewAgendaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAgenda) { }

  ngOnInit(): void {
  }

  cancelNewAgenda(): void {
    this.dialogRef.close();
  }
}
