import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/auth/token.service';
import { PingService } from 'src/app/_services/ping/ping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ping: number = 0;
  username: string;
  constructor(private tokenService:TokenService, 
              private activeRouter: Router,
              private pingService:PingService) { }

  ngOnInit(): void {
      this.pingService.pingStream.subscribe(ping => {
      this.ping = Math.round(ping);
    })
  }

  isLogin(){
    if( this.tokenService.isLogin()){
      this.username=this.tokenService.getUser().email
      return true
    }else return false;
  }

  logout(){
    this.tokenService.signOut();
    this.activeRouter.navigateByUrl('/login'); 

  }

}
