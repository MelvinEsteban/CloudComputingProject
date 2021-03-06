import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agenda } from '../agenda-picker/agenda-picker.component';
import { AuthService } from '../auth/auth.service';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MessageService } from '../message/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEventDialogComponent } from '../edit-event-dialog/edit-event-dialog.component';


export interface MyEvent extends CalendarEvent {
  idAgenda: number;
  description?: string;
  visible: boolean;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent implements OnInit {

  private durationSnackBar = 1000 ;
  viewDate = new Date();
  CalendarView = CalendarView;
  view = CalendarView.Week;
  events: MyEvent[] = [];
  visibleEvents: MyEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  agendas: Agenda[] = [];
  default = {
    draggable: true,
    visible: false,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    actions: [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: any }): void => {
          this.openDialogEditEvent(event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        onClick: ({ event }: { event: any }): void => {
          this.deleteEvent(event);
        },
      }
    ]
  }

  constructor(private modal: NgbModal, private messageService: MessageService, public dialog: MatDialog, private authService: AuthService, private _snackBar: MatSnackBar
   ) {
    }

  ngOnInit(): void {
    this.messageService.sendGet(environment.urlEvents + '/' + this.authService.loggedIdUser).subscribe(
      (res) => {
        if (res.status === 'ok') {
          const TimeZoneOffset = new Date().getTimezoneOffset() ;
          for (let index = 0; index < res.data.result.length; index++) {
            const element = res.data.result[index];
            console.log(element.date_begin, moment(element.date_begin).add(TimeZoneOffset, 'minutes').toDate());
            this.events.push({
              id: element.id_event,
              start: moment(element.date_begin).add(TimeZoneOffset, 'minutes').toDate(),
              end: moment(element.date_end).add(TimeZoneOffset, 'minutes').toDate(),
              title: element.title,
              description: element.description,
              idAgenda: element.id_agenda,
              ...this.default
            })
          }
          this.updateVisibleEvents();
        }
      }
    )
  }

  deleteEvent(eventToDelete: MyEvent) {
    this.events = this.events.filter((event) => event.id !== eventToDelete.id);
    this.visibleEvents = this.visibleEvents.filter((event) => event.id !== eventToDelete.id);
    this.messageService.sendDelete(environment.urlEvents + '/' + eventToDelete.id).subscribe((res) => {
      if (res.status === 'ok') {
        this._snackBar.open("Event delete : " + eventToDelete.title, undefined, { duration: this.durationSnackBar });
      } else if (res.status === 'error') {
        this._snackBar.open('Error ' + res.data.reason, undefined, { duration: this.durationSnackBar });
      }
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  openDialogCreateEvent(date: Date = new Date()): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '35vw',
      data: { event: { start: date, end: new Date(date.getTime() + 1000 * 60 * 60) }, agendas: this.agendas }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent(result);
      }
    });
  }

  openDialogEditEvent(item: MyEvent): void {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '35vw',
      data: { event: {...item}, agendas: this.agendas }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'delete') {
          this.deleteEvent(item);
        } else if (JSON.stringify(item) !== JSON.stringify(result)) {
          this.updateEvent(result);
        }
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (date.getMonth() == this.viewDate.getMonth()) {
      if (
        ((this.viewDate.getDay() == date.getDay()) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  hourClicked(event: any): void {
    this.openDialogCreateEvent(event.date);
  }

  addEvent(event: MyEvent): void {
    const troll = event.start;
    console.log(troll, moment(troll).format("YYYY-MM-DD HH:mm:ss"));
    const data = {
      id_event: event.id,
      title: event.title,
      date_begin: moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
      date_end: moment(event.end).format("YYYY-MM-DD HH:mm:ss"),
      description: '',
      id_agenda: event.idAgenda,
    }
    this.messageService.sendPost(environment.urlEvents, data).subscribe((res) => {
      if (res.status === 'ok') {
        event.id = res.data.id;
        this.events = [
          ...this.events,
          {
            ...event,
            ...this.default
          }
        ];
        this.visibleEvents = [
          ...this.visibleEvents,
          {
            ...event,
            ...this.default
          }
        ];
      }
      this.refresh.next();
    });
  }

  updateEvent(event: MyEvent) {
    const index = this.events.findIndex((item) => item.id === event.id);
    const indexVisible = this.visibleEvents.findIndex( (item) => item.id === event.id) ;

    const data = {
      id_agenda: event.idAgenda,
      id_event: event.id,
      date_begin: moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
      date_end: moment(event.end).format("YYYY-MM-DD HH:mm:ss"),
      title: event.title,
      description: event.description
    }
    this.messageService.sendPut(environment.urlEvents, data).subscribe((res) => {
      if (res.status === 'ok') {
        this._snackBar.open('Event updated', undefined, { duration: this.durationSnackBar });
        this.events[index] = event;
        this.visibleEvents[indexVisible] = event
        this.refresh.next();
      }
      else if (res.status === 'error') {
        this._snackBar.open('Error' + res.data.reason, undefined, { duration: this.durationSnackBar });
      }
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private updateVisibleEvents(): void {
    this.visibleEvents = [];
    this.events.forEach(element => {
      if (this.agendas.some(item => item.visible && item.id_agenda == element.idAgenda)) {
        this.visibleEvents.push(element);
      }
    });
    this.refresh.next();
  }

  onUpdateAgenda(agendas: Agenda[]) {
    this.agendas = agendas;
    this.updateVisibleEvents();
  }

  onUpdateDate(dateSelected: Date) {
    this.viewDate = dateSelected;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: any): void {
    if (event.start < event.end) {
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
      this.updateEvent(event)
    } 
  }
}
