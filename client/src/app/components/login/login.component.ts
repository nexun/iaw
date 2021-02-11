import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  loading: boolean;
  dataForm: FormGroup;
  msg:String;
  constructor(private loginForm: FormBuilder,
    private controllerUser: UserControllerService,
    private tokenservice: TokenService,
    private activeRouter: Router) {
    this.init();
   }

  ngOnInit(): void {
    this.loading=false;
  }

  login(){

    if (this.dataForm.valid){
      this.loading=true;
      //Objeto necesario del schema
      const request = {
        email:this.dataForm.value.email,
        password:this.dataForm.value.password
      }

      this.controllerUser.userControllerLogin(request).subscribe((response)=>{
        this.tokenservice.saveToken(response.token);
        this.activeRouter.navigateByUrl('/home');
      },
      (err)=>{this.msg=' <div class="alert alert-danger" display="" role="alert"> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Usuario y/o Contraseña inválidos</div>'
      this.loading=false;
    }
      )
      

    }
  }

 
  
  init(){
    this.dataForm = this.loginForm.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

}
