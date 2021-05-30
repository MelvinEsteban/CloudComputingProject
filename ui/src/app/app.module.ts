import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter, MOMENT, CalendarDateFormatter,CalendarMomentDateFormatter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AgendaComponent } from './agenda/agenda.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AgendaPickerComponent } from './agenda-picker/agenda-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewAgendaDialogComponent } from './new-agenda-dialog/new-agenda-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    NavbarComponent,
    LoginComponent,
    CreateAccountDialogComponent,
    AgendaPickerComponent,
    DatePickerComponent,
    NewAgendaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      }),
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ScrollingModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
