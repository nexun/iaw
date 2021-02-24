import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventlistComponent }  from './components/eventlist/eventlist.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { NeweventComponent }  from './components/newevent/newevent.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';
import { SignupGuard } from './_guards/signup.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PublicEventComponent } from './components/publicEvent/publicEvent.component';
import { PrivateEventComponent } from './components/privateEvent/privateEvent.component';

const routes: Routes = [  

  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'home', component: EventlistComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'new-event', component: NeweventComponent, canActivate:[AuthGuard] },
  { path: 'modify/:id', component: NeweventComponent, canActivate:[AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate:[AuthGuard] },
  { path: 'public/:id', component: PublicEventComponent },
  { path: 'private/:id', component: PrivateEventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate:[SignupGuard] } ,
  { path: '**', redirectTo: '/signup' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
