import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message/message.service';

export interface DialogData {
  login: string;
  password : string;
}

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {

  hide = true;
  login = '';
  password = '';
  errorMessage = '';
  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject (MessageService) private messageService: MessageService)
  {

  }
  ngOnInit() {
  }

  cancelNewAccount(): void {
    this.dialogRef.close();
  }

  createNewAccount(): void {
    this.messageService.sendPost(
      environment.urlUsers+"/addUser",
      {
        login: this.data.login,
        password: this.data.password
      }).subscribe( (resBackend) => {
      if (resBackend.status === 'error'){
        this.errorMessage = resBackend.data.reason ;
      }
      else{
        this.errorMessage = '' ;
        this.dialogRef.close(resBackend) ;
      }
    }) ;
  }
}
