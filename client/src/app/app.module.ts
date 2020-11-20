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

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    NeweventComponent,
    LoginComponent,
    NavbarComponent
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
    httpInterceptorProviders
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
