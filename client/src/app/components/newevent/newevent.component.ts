import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
})
export class NeweventComponent implements OnInit {
  dataForm: FormGroup;
  event: EventModel;
  idx: string;
  title: string;
  msg: string;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: EventService,
    private newEventForm: FormBuilder,
    private controllerEvent: EventControllerService,
    private route: ActivatedRoute,
    private activeRouter: Router,
    public datepipe: DatePipe,
    private tokenService: TokenService
  ) {
    this.init();
  }

  addEvent() {
    if (this.dataForm.valid) {
      var idx = this.route.snapshot.paramMap.get('id');
      if (idx !== null) {
        const request = {
          name: this.dataForm.value.name,
          date: this.dataForm.value.date,
          endDate: this.dataForm.value.endDate,
          emailOwner: this.tokenService.getUser().email,
        };
        this.service
          .editEvent(idx, request)
          .subscribe(() => this.buttonClicked.emit(true));
      } else {
        const request = {
          name: this.dataForm.value.name,
          date: this.dataForm.value.date,
          endDate: this.dataForm.value.endDate,
          emailOwner: this.tokenService.getUser().email,
        };
        this.service.addEvent(request);
        this.buttonClicked.emit(true);
      }
    }
  }
  closeEvent() {
    this.buttonClicked.emit(false);
  }

  ngOnInit() {
    this.idx = this.route.snapshot.paramMap.get('id');
    if (this.idx == null) {
      this.title = 'Crear Evento';
      this.event = new EventModel();
    } else {
      this.title = 'Modificar Evento';
      this.controllerEvent
        .eventControllerFindById(this.idx)
        .subscribe((event) => {
          this.event = event;
          console.log(this.event.date);
          this.dataForm.patchValue({
            name: this.event.name,
            date: this.event.date,
            //endDate: this.event.endDate,
          });
        });
    }
  }
  init() {
    this.dataForm = this.newEventForm.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      endDate: ['', Validators.required],
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
