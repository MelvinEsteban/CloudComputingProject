import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path : 'connexion', component :LoginComponent},
  {
    path: '',
    canActivateChild: [AuthGuard], 
    children: [
      { path: 'agenda', component: AgendaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
