import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agenda } from '../agenda-picker/agenda-picker.component';
import { MyEvent } from '../agenda/agenda.component';

export interface DialogData {
  event : MyEvent;
  agendas : Agenda[] ;
}

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss']
})
export class CreateEventDialogComponent implements OnInit {

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disabledButton : boolean = true ;
  constructor( public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }


  //Verification of the forms
  updateDisabledButton() : void {
    if (this.data.event.title && this.data.event.idAgenda){
      this.disabledButton = false ;
    }
  }

  onCancelNewEvent() : void {
    this.dialogRef.close() ;
  }
}
