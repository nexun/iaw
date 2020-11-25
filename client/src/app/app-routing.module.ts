import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventlistComponent }  from './components/eventlist/eventlist.component';
import { NeweventComponent }  from './components/newevent/newevent.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';
import { SignupGuard } from './_guards/signup.guard';

const routes: Routes = [  

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: EventlistComponent, canActivate:[AuthGuard] },
  { path: 'new-event', component: NeweventComponent, canActivate:[AuthGuard] },
  { path: 'modify/:id', component: NeweventComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate:[SignupGuard] } 

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
