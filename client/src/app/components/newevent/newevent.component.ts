import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';

import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EventModel } from 'src/app/_model/event.model';
import { EventControllerService } from 'src/app/openapi';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
})
export class NeweventComponent implements OnInit {
  event: EventModel;
  idx: string;
  title: string;
  msg: string;
  eventDayForm: FormGroup;
  deletedOptions: FormGroup;
  isDisabled: Boolean;
  id: string;
  loading: boolean;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();
  @Input() eventId: string;
  @Input() public: Boolean;
  fechaActual: string;

  constructor(
    private service: EventService,
    private newEventForm: FormBuilder,
    private controllerEvent: EventControllerService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private tokenService: TokenService,
    private activeRouter: Router,
    private fb: FormBuilder
  ) {
    this.init();
  }

  triggerSomeEvent() {
    this.isDisabled = !this.isDisabled;
  }

  sumDate(day) {
    var fecha = new Date(day.eventDate);
    return fecha.setHours(fecha.getHours() + day.duration);
  }

  async addEvent() {
    if (this.eventDayForm.value.days.length > 0) {
      if (this.eventDayForm.valid) {
        var request = {};
        var idx = this.eventId;
        if (idx !== undefined) {
          if (this.eventDayForm.value.password !== undefined) {
            request = {
              name: this.eventDayForm.value.eventName,
              password: this.eventDayForm.value.password,
            };
          } else {
            request = {
              name: this.eventDayForm.value.eventName,
            };
          }

          this.service.editEvent(idx, request).subscribe((response) => {
            const days = this.eventDayForm.value.days;
            days.map((day) => {
              const request = {
                eventDate: new Date(day.eventDate),
                duration: day.duration,
              };
              this.service
                .addDayEvent(idx, request)
                .subscribe((response) => {});
              this.buttonClicked.emit(true);
            });
            this.buttonClicked.emit(true);
          });
        } else {
          if (this.eventDayForm.value.password !== undefined) {
            if (this.public) {
              request = {
                name: this.eventDayForm.value.eventName,
                password: this.eventDayForm.value.password,
                ownerEmail: this.eventDayForm.value.ownerEmail,
              };
            } else {
              request = {
                name: this.eventDayForm.value.eventName,
                password: this.eventDayForm.value.password,
                ownerEmail: this.tokenService.getUser().email,
              };
            }
          } else {
            if (this.public) {
              request = {
                name: this.eventDayForm.value.eventName,
                ownerEmail: this.eventDayForm.value.ownerEmail,
              };
            } else {
              request = {
                name: this.eventDayForm.value.eventName,
                ownerEmail: this.tokenService.getUser().email,
              };
            }
          }
          await this.service.addEvent(request).subscribe((response) => {
            this.id = response.id;
            const days = this.eventDayForm.value.days;
            days.map((day) => {
              const request = {
                eventDate: new Date(day.eventDate),
                duration: day.duration,
              };
              this.service
                .addDayEvent(this.id, request)
                .subscribe((response) => {
                  if (this.public) {
                    this.activeRouter.navigateByUrl('/private/' + this.id);
                  }
                  this.buttonClicked.emit(true);
                });
            });
          });
        }
      }
    } else {
      alert('Debe agregar al menos una fecha');
    }
  }

  closeEvent() {
    this.buttonClicked.emit(false);
  }

  onChange(optionId: string, isChecked: boolean) {
    const daysForm = <FormArray>this.deletedOptions.controls.opcion;

    if (isChecked) {
      daysForm.push(new FormControl(optionId));
    } else {
      let index = daysForm.controls.findIndex((x) => x.value == optionId);
      daysForm.removeAt(index);
    }
  }

  ngOnInit() {
    this.fechaActual=(new Date()).toISOString().slice(0,16);
    console.log(this.fechaActual)
    this.loading = true;
    this.idx = this.eventId;

    if (this.public) {
      this.eventDayForm = this.newEventForm.group({
        eventName: ['', Validators.required],
        password: [''],
        ownerEmail: ['', Validators.required],
        days: this.newEventForm.array([]),
      });
      this.deletedOptions = this.fb.group({
        opcion: this.fb.array([], Validators.required),
      });
    } else {
      this.eventDayForm = this.newEventForm.group({
        eventName: ['', Validators.required],
        password: [''],
        days: this.newEventForm.array([]),
      });
      this.deletedOptions = this.fb.group({
        opcion: this.fb.array([], Validators.required),
      });
    }
    if (this.idx == null) {
      this.title = 'Crear Evento';
      this.event = new EventModel();
      this.loading = false;
    } else {
      this.title = 'Modificar Evento';
      this.controllerEvent
        .eventControllerFindById(this.idx)
        .subscribe((event) => {
          this.event = event;
          this.eventDayForm.patchValue({
            eventName: this.event.name,
          });
          this.loading = false;
        });
    }
  }

  get days(): FormArray {
    return this.eventDayForm.get('days') as FormArray;
  }

  newDay(): FormGroup {
    return this.newEventForm.group({
      eventDate: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  addDay() {
    this.days.push(this.newDay());
  }

  removeDay(i: number) {
    this.days.removeAt(i);
  }

  removeSelected() {
    const opciones = this.deletedOptions.value.opcion;

    opciones.map((opcion) => {
      this.service.removeEventDay(opcion).subscribe((response) => {});
    });
    this.buttonClicked.emit(true);
  }

  init() {
    this.isDisabled = true;
  }
}
