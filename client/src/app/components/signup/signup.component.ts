import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  dataForm: FormGroup;
  constructor(private signUpForm: FormBuilder,
    private controllerUser: UserControllerService,
    private activeRouter: Router) {
    this.init();
   }

  signup(){

    if (this.dataForm.valid){
      const request = {
        email:this.dataForm.value.email,
        password:this.dataForm.value.password,
        first_name:this.dataForm.value.firstname,
        last_name:this.dataForm.value.lastname
      }

      this.controllerUser.userControllerSignUp(request).subscribe((response)=>{
        this.activeRouter.navigateByUrl('/login');
      })

    }
  }
  ngOnInit(): void {
  }
  init(){
    this.dataForm = this.signUpForm.group({
      email:['', Validators.required],
      password:['', Validators.required],
      repassword:['', Validators.required]


    })
  }
  

}
