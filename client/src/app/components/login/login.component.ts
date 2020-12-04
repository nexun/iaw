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
  msg:String;
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
        this.tokerservice.saveToken(response.token);
        this.activeRouter.navigateByUrl('/');
      },
      (err)=>this.msg=' <div class="alert alert-danger" display="" role="alert"> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Usuario y/o Contraseña inválidos</div>'
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
