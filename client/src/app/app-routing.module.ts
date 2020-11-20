import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventlistComponent }  from './components/eventlist/eventlist.component';
import { NeweventComponent }  from './components/newevent/newevent.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: EventlistComponent },
  { path: 'new-event', component: NeweventComponent },
  { path: 'modify/:idx', component: NeweventComponent },
  { path: 'login', component: LoginComponent }

  
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
