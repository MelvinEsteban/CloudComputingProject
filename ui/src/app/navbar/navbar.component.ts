import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { EditPasswordDialogComponent } from '../edit-password-dialog/edit-password-dialog.component';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private durationSnack = 1500 ;

  constructor(public authService : AuthService, private router : Router,
    public dialog: MatDialog, private messageService : MessageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut() ;
    this.router.navigateByUrl('/connexion') ;
  }

  openDialogEdit() : void {
    const dialogRef = this.dialog.open( EditPasswordDialogComponent, {
      width:'35wh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.messageService.sendPut(environment.urlUsers + '/editPassword', {id_user: this.authService.loggedIdUser , password : result}).subscribe( (res) => {
          if (res.status === 'ok'){
            this._snackBar.open(res.data.message, undefined, {duration : this.durationSnack}) ;
          } else if (res.status === 'error'){
            this._snackBar.open(res.data.reason, undefined, { duration : this.durationSnack}) ;
          }
        }) ;
      }
    });
  }
}
