import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Output() eventDate = new EventEmitter<Date>() ;
  selectedDate : Date = new Date() ;
  constructor() { }

  ngOnInit(): void {
  }

  selectedChange(date : Date) {
    this.selectedDate = date;
    this.eventDate.emit(this.selectedDate) ;
  }
}
