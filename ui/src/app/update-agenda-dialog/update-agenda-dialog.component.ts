import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agenda } from '../agenda-picker/agenda-picker.component';

interface DialogData {
  agenda : Agenda
}

@Component({
  selector: 'app-update-agenda-dialog',
  templateUrl: './update-agenda-dialog.component.html',
  styleUrls: ['./update-agenda-dialog.component.scss']
})
export class UpdateAgendaDialogComponent implements OnInit {

  
  public deleteString  = "delete" ;
  constructor( public dialogRef: MatDialogRef<UpdateAgendaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onCancelNewEvent() : void {
    this.dialogRef.close() ;
  }
}
