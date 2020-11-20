import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenservice:TokenService, 
              private activeRouter: Router) { }

  ngOnInit(): void {

  }

  isLogin(){
    return this.tokenservice.isLogin();
  }

  logout(){
    this.tokenservice.signOut();
    this.activeRouter.navigateByUrl('/login'); 

  }

}
