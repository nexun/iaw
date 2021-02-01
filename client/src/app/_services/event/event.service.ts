import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';
import { EventModel } from 'src/app/_model/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  events: EventModel[];

  constructor(
    private eventController: EventControllerService,
    //private optionController:OptionControllerService,

    private activeRouter: Router
  ) {}

  getEvents() {
    return this.eventController.eventControllerFind();
  }

  getEventById(id) {
    return this.eventController.eventControllerFindById(id);
  }

  /* getEventOptions(){
    return this.optionController.optionControllerFind()
  } 
*/
  addEvent(event) {
    this.eventController
      .eventControllerCreate(event)
      .subscribe((response) => response); //ver
  }
  /* addOption(option){    
    this.optionController.optionControllerCreate(option).subscribe(response=>response) //ver
  }*/
  editEvent(id, request) {
    return this.eventController.eventControllerUpdateById(id, request);
  }
  removeEvent(id) {
    return this.eventController.eventControllerDeleteById(id);
  }
}
