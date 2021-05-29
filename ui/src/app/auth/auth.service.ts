import { Injectable } from '@angular/core';
import { MessageService, resBackend } from '../message/message.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connected: boolean = false;
  loggedLoginUser : string = '';
  loggedIdUser : Number = 0;

  constructor(private messageService: MessageService) { }

  sendAuthentication(login: string, password: string): Observable<resBackend> {

    return this.messageService.sendPost(environment.urlUsers + '/checkLogin', {
      login: login,
      password: password
    });
  }

  finalizeAuthentication(message: resBackend): string {
    if (message.status === 'ok') {
      this.connected = true;
      this.loggedIdUser = message.data.id;
      this.loggedLoginUser = message.data.login; 
      return '';
    }
    else {
      this.connected = false;
      return message.data.reason;
    }

  }

  signOut() : void{
    this.connected = false;
    
  }
}
