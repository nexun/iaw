import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventlistComponent }  from './components/eventlist/eventlist.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './_services/auth/token.service';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from './_interceptors';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { PingService } from './_services/ping/ping.service';

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    NeweventComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [
    TokenService,
    httpInterceptorProviders,
    PingService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
