import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Agenda, User } from '../agenda-picker/agenda-picker.component';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';

interface DialogData {
  agenda : Agenda
}

@Component({
  selector: 'app-agenda-users-dialog',
  templateUrl: './agenda-users-dialog.component.html',
  styleUrls: ['./agenda-users-dialog.component.scss']
})
export class AgendaUsersDialogComponent implements OnInit {

  controlUser = new FormControl() ;
  lUsers : User[] = [] ;
  lTotalUsers : User[] = [] ;
  constructor(public dialogRef: MatDialogRef<AgendaUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private messageService : MessageService) { }

  ngOnInit(): void {
    this.messageService.sendGet(environment.urlAgenda + '/getAll/' + this.data.agenda.id_agenda.toString()).subscribe( (retour) => {
      if (retour.status === 'ok'){
        this.lUsers = [...retour.data] ;
        this.messageService.sendGet(environment.urlUsers + '/getAll').subscribe( (retour2) => {
          if (retour2.status === 'ok'){
            this.lTotalUsers = [...retour2.data] ;
          }
        });
      }
    });

    
  }


  onClose() : void {
    this.dialogRef.close(this.lUsers) ;
  }

  addUser() : void {
    const userToAdd = this.lTotalUsers.find( (item) => item.login === this.controlUser.value) ;
    
    if (userToAdd && !this.lUsers.find( (item) => item.id_user === userToAdd.id_user )){
      const data = {
        id_agenda : this.data.agenda.id_agenda,
        id_user : userToAdd.id_user
      }
      
      this.messageService.sendPost(environment.urlAgenda + '/addUsers', data).subscribe( (retour) => {
        if (retour.status === 'ok'){
          this.lUsers.push(userToAdd) ;
        }
      });
    }

  }

  removeUser(user : User) : void {
    const data = {
      ...user,
      id_agenda : this.data.agenda.id_agenda
    } ;
    
    this.messageService.sendPost(environment.urlAgenda + '/deleteUsers', data).subscribe( (retour) => {
      if (retour.status === 'ok'){
        this.lUsers = this.lUsers.filter( (item) => item.id_user !== user.id_user) ;
      }
    })
  }
}
