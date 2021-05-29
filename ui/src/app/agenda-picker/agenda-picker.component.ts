import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';

export interface Agenda {
  id_agenda : Number;
  name : string ;
  id_user : Number ;
}

@Component({
  selector: 'app-agenda-picker',
  templateUrl: './agenda-picker.component.html',
  styleUrls: ['./agenda-picker.component.scss']
})
export class AgendaPickerComponent implements OnInit {

  agendas : Agenda[] = [] ;

  constructor(private messageService: MessageService, private authService : AuthService) { }

  ngOnInit(): void {
    this.messageService.sendGet(environment.urlAgenda + this.authService.loggedIdUser).subscribe(
      (res) => {
        if (res.status === 'ok'){
          this.agendas = res.data ;
          console.log(this.agendas) ;
        }
    }) ;
  }

}
