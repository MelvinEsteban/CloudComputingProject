import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Agenda } from '../agenda-picker/agenda-picker.component';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  viewDate = new Date();
  CalendarView = CalendarView;
  view = CalendarView.Week;
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen : boolean = true ;


  constructor(private modal : NgbModal, private messageService : MessageService) { }
  
  ngOnInit(): void {
    this.messageService.sendGet('').subscribe(
      (res) => {
        if (res.status === 'ok'){

        }
      }

    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onUpdateAgenda(agendas : Agenda[]) {
    console.log(agendas) ;
  }

  onUpdateDate(dateSelected : Date) {
    this.viewDate = dateSelected ;
  }
}
