import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
import { NewAgendaDialogComponent } from '../new-agenda-dialog/new-agenda-dialog.component';
import { UpdateAgendaDialogComponent } from '../update-agenda-dialog/update-agenda-dialog.component';

export interface Agenda {
  id_agenda: Number;
  name: string;
  id_user: Number;
  visible: boolean;
}

@Component({
  selector: 'app-agenda-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda-picker.component.html',
  styleUrls: ['./agenda-picker.component.scss']
})
export class AgendaPickerComponent implements OnInit {

  @Output() eventAgenda = new EventEmitter();
  agendas: Agenda[] = [];
  constructor(private messageService: MessageService, private authService: AuthService, public dialog: MatDialog, private changeDetection: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  getAllAgenda(): void {
    this.messageService.sendGet(environment.urlAgenda + '/' + this.authService.loggedIdUser.toString()).subscribe(
      (res) => {
        if (res.status === 'ok') {
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            this.agendas.push({ ...element, visible: true })
          }
        }
        this.onUpdateAgendaSelected();
      });
  }

  ngOnInit(): void {
    this.getAllAgenda();
  }

  openDialogAgenda(): void {
    const dialogRef = this.dialog.open(NewAgendaDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messageService.sendPost(environment.urlAgenda, { id_user: this.authService.loggedIdUser, name: result }).subscribe(
          (res) => {
            if (res.status === 'ok') {
              this.agendas.push({
                id_agenda: res.data.id,
                name: result,
                id_user: this.authService.loggedIdUser,
                visible: true
              });
              this.changeDetection.detectChanges();
              this.onUpdateAgendaSelected() ;
            }
          }
        );
      }
    });
  }

  deleteAgenda(agendaToDelete: Agenda): void {
    this.messageService.sendDelete(environment.urlAgenda + '/' + agendaToDelete.id_agenda.toString()).subscribe((res) => {
      if (res.status === 'ok') {
        this.agendas = this.agendas.filter((event) => event.id_agenda !== agendaToDelete.id_agenda);
        this._snackBar.open("Agenda deleted : " + agendaToDelete.name, undefined, { duration: 3000 });
        this.changeDetection.detectChanges();
        this.onUpdateAgendaSelected();
      } else if (res.status === 'error') {
        this._snackBar.open("Error while deleting : " + res.data.reason, undefined, { duration: 3000 });
      }
    })
  }

  editAgenda(event: Event, item: Agenda): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UpdateAgendaDialogComponent, {
      width: '30wh',
      data: { agenda: { ...item } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log(item);
        if (result === 'delete') {
          this.deleteAgenda(item);
        } else if (JSON.stringify(item) !== JSON.stringify(result)) {
          this.messageService.sendPut(environment.urlAgenda, result).subscribe(retour => {
            if (retour.status === 'ok') {
              const index = this.agendas.findIndex((agenda) => agenda.id_agenda === result.id_agenda);
              this.agendas[index] = { ...result };
              this.changeDetection.detectChanges();
              this._snackBar.open("Schedule uptaded", undefined, { duration: 3000 });
            }
            else if (retour.status === 'error') {
              this._snackBar.open("Error" + retour.data.reason, undefined, { duration: 3000 });
            }
          });
        }
      }
    })
  }

  onUpdateAgendaSelected(): void {
    this.eventAgenda.emit(this.agendas);
  }
}
