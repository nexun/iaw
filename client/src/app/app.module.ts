import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
//import { NeweventComponent } from './components/newevent/newevent.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './_services/auth/token.service';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from './_interceptors';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { DatePipe } from '@angular/common';
import { CalendaryModule } from './components/calendar/calendar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NeweventComponent } from './components/newevent/newevent.component';
import { PublicEventComponent } from './components/publicEvent/publicEvent.component';
import { PrivateEventComponent } from './components/privateEvent/privateEvent.component';

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    NeweventComponent,
    PublicEventComponent,
    PrivateEventComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendaryModule,
  ],
  providers: [
    TokenService,
    httpInterceptorProviders,
    //PingService,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
