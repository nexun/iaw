import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';

import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
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

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: EventService,
    private newEventForm: FormBuilder,
    private controllerEvent: EventControllerService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private tokenService: TokenService
  ) {
    this.init();
  }

  isDisabled = true;
  triggerSomeEvent() {
    this.isDisabled = !this.isDisabled;
    return;
  }
  sumDate(day) {
    var fecha = new Date(day.eventDate);
    return fecha.setHours(fecha.getHours() + day.duration);
  }
  addEvent() {
    if (this.eventDayForm.valid) {
      var idx = this.route.snapshot.paramMap.get('id');
      if (idx !== null) {
        const request = {
          name: this.eventDayForm.value.eventName,
        };
        this.service.editEvent(idx, request).subscribe((response) => {
          const days = this.eventDayForm.value.days;
          days.map((day) => {
            const request = {
              eventDate: new Date(day.eventDate),
              duration: day.duration,
            };
            this.service.addDayEvent(idx, request).subscribe((response) => {
              console.log(response);
            });
          });
        });
        this.buttonClicked.emit(true);
      } else {
        const request = {
          name: this.eventDayForm.value.eventName,
          ownerEmail: this.tokenService.getUser().email,
        };
        this.service.addEvent(request).subscribe((response) => {
          const id = response.id;
          const days = this.eventDayForm.value.days;
          days.map((day) => {
            const request = {
              eventDate: new Date(day.eventDate),
              duration: day.duration,
            };
            this.service.addDayEvent(id, request).subscribe((response) => {
              console.log(response);
            });
          });
        });
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
          console.log(event);
          this.event = event;
          this.eventDayForm.patchValue({
            eventName: this.event.name,
          });
        });
    }
  }

  get days(): FormArray {
    return this.eventDayForm.get('days') as FormArray;
  }

  newDay(): FormGroup {
    return this.newEventForm.group({
      eventDate: '',
      duration: '',
    });
  }

  addDay() {
    this.days.push(this.newDay());
  }

  removeDay(i: number) {
    this.days.removeAt(i);
  }

  init() {
    this.eventDayForm = this.newEventForm.group({
      eventName: [''],
      days: this.newEventForm.array([]),
    });
  }
}
