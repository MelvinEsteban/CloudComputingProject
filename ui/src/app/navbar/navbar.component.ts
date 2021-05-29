import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut() ;
    this.router.navigateByUrl('/connexion') ;
  }
}
