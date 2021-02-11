import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserControllerService } from 'src/app/openapi';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  msg: String;
  success: Boolean;
  dataForm: FormGroup;
  valueEmittedFromChildComponent: string = '';
  constructor(
    private signUpForm: FormBuilder,
    private controllerUser: UserControllerService,
    private activeRouter: Router,
    private modal: NgbModal,
    private route: ActivatedRoute
  ) {
    this.init();
  }
  parentEventHandlerFunction(valueEmitted) {
    this.valueEmittedFromChildComponent = valueEmitted;

    if (valueEmitted) {
      this.modal.dismissAll();
      this.ngOnInit();
    } else {
      this.modal.dismissAll();
    }
  }
  signup() {
    if (this.dataForm.valid) {
      const request = {
        email: this.dataForm.value.email,
        password: this.dataForm.value.password,
        firstname: this.dataForm.value.firstname,
        lastname: this.dataForm.value.lastname,
      };

      this.controllerUser
        .userControllerSignUp(request)
        .subscribe((response) => {
          this.activeRouter.navigate(['/login', { success: true }]);
        });
    }
  }
  handleAddEvent(): void {
    this.modal.open(this.modalEventContent, { size: 'lg' });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.success = params.success;
      if (this.success) {
        this.msg =
          ' <div class="alert alert-success" display="" role="alert"> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> <h3>Su eleccion fue enviada correctamente</h3></div>';
      }
    });
  }
  init() {
    this.dataForm = this.signUpForm.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
  }
}
