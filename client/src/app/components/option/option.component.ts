import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EventModel } from 'src/app/_model/event.model';
import { EventControllerService, UserControllerService } from 'src/app/openapi';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
  
})
export class NewOptionComponent implements OnInit {
  dataFormOption: FormGroup;
  event: EventModel;
  title: string;
  msg: string;
  @Input() eventX: string;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: EventService,
    //cambiar por el de option
    private newOptionForm: FormBuilder,
    public datepipe: DatePipe,
    private tokenService: TokenService
  ) {
    this.init();
  }

  addOption() {
    console.log("id evento->"+this.eventX+" email->"+this.dataFormOption.value.ownerEmail)
    if (this.dataFormOption.valid) {
      const request = {
        eventId: this.eventX,
        ownerEmail: this.dataFormOption.value.ownerEmail,
      };

      //this.service.addOption(request);
      this.buttonClicked.emit(true);
    }
  }
  closeOption() {
    this.buttonClicked.emit(false);
  }

  ngOnInit() {
    this.title = 'Elegir opcion';
    //este modelo no iria?
    this.event = new EventModel();
   
  }
  init() {
    this.dataFormOption = this.newOptionForm.group({
      ownerEmail: [''],
      eventId: [''],
    });
  }
  onSubmit(): void {
    /*
    this.event.name=this.newEventForm.get('eventName').value
    if(this.idx==null){this.addEvent(this.event);}
    this.router.navigateByUrl('/home') 
    */
  }
}
