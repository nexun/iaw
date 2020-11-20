import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/openapi/';
import { TokenService } from 'src/app/_services/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataForm: FormGroup;
  
  constructor(private loginForm: FormBuilder,
    private controllerUser: UserControllerService,
    private tokerservice: TokenService,
    private activeRouter: Router) {
    this.init();
   }

  ngOnInit(): void {
  }

  login(){

    if (this.dataForm.valid){
      //Objeto necesario del schema
      const request = {
        email:this.dataForm.value.email,
        password:this.dataForm.value.password
      }

      this.controllerUser.userControllerLogin(request).subscribe((response)=>{
        console.log(response.token)
        this.tokerservice.saveToken(response.token);
        this.activeRouter.navigateByUrl('/');
      })

    }
  }
  
  init(){
    this.dataForm = this.loginForm.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

}
