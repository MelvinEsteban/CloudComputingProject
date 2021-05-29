import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }
  ngOnInit(): void {
  }

  connexionLogin(): void {
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Please enter a login and a password';
    }
    else {
      this.authService.sendAuthentication(this.username, this.password)
        .subscribe(
          (resBackend) => {
            this.errorMessage = this.authService.finalizeAuthentication(resBackend);
            if (this.authService.connected) {
              this.router.navigateByUrl('agenda');
            }
          }
        );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent,
      {
        width: '50%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result !== undefined) {
          this.errorMessage = this.authService.finalizeAuthentication(result);
            if (this.authService.connected) {
              this.router.navigateByUrl('agenda');
            }
        }
      });
  }
}
