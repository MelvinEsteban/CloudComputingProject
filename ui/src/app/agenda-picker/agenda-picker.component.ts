import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
import { NewAgendaDialogComponent } from '../new-agenda-dialog/new-agenda-dialog.component';

export interface Agenda {
  id_agenda: Number;
  name: string;
  id_user: Number;
  visible: boolean;
}

@Component({
  selector: 'app-agenda-picker',
  templateUrl: './agenda-picker.component.html',
  styleUrls: ['./agenda-picker.component.scss']
})
export class AgendaPickerComponent implements OnInit {

  @Output() eventAgenda = new EventEmitter() ;
  agendas: Agenda[] = [];
  constructor(private messageService: MessageService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.messageService.sendGet(environment.urlAgenda + '/' + this.authService.loggedIdUser.toString()).subscribe(
      (res) => {
        if (res.status === 'ok') {
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            this.agendas.push({ ...element, visible: false })
          }
        }
      });
    this.onUpdateAgendaSelected() ;
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
              this.agendas.push(
                {
                  id_agenda: res.data.id,
                  name: result,
                  id_user: this.authService.loggedIdUser,
                  visible: false
                });
            }
          }
        );
      }
    });
  }

  editAgenda(event: Event, item: Agenda): void {
    event.stopPropagation();
  }

  onUpdateAgendaSelected(): void {
    this.eventAgenda.emit(this.agendas) ;
  }
}
