import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventControllerService, OptionControllerService, EventDayControllerService, EventEventDayControllerService, EventDayOptionControllerService } from 'src/app/openapi';
import { EventModel } from 'src/app/_model/event.model';

@Injectable({  providedIn: 'root' })
export class EventService {

  events:EventModel[]

  constructor(  
    private eventController:EventControllerService,
    private optionController:OptionControllerService,
    private eventDayController:EventDayControllerService,
    private dayController:EventEventDayControllerService,
    private eventdayOptionController:EventDayOptionControllerService,



    private activeRouter: Router,
    ) {    }
    
  getEvents(){
    return this.eventController.eventControllerFind()
  }
  getEventsByEmail(email){
    return this.eventController.eventControllerFindByEmail(email)
  }


  getEventById(id){
    return this.eventController.eventControllerFindById(id)
  }  

  getEventOptions(){
    return this.optionController.optionControllerFind()
  }  

  addEvent(event){    
    return this.eventController.eventControllerCreate(event)//.subscribe(response=>response) //ver
  }
  addDayEvent(id, day){    
    return this.dayController.eventEventDayControllerCreate(id, day)//.subscribe(response=>response) //ver
  }
  addOptionDay(eventDayId, email){    
    return this.eventdayOptionController.eventDayOptionControllerCreate(eventDayId,email) //ver
  }
  removeEventDay(eventDayId){    
    return this.eventDayController.eventDayControllerDeleteById(eventDayId)//ver
  }
  addOption(opc){    
    return this.optionController.optionControllerCreate(opc) //ver
  }
  editEvent(id,request){
    return this.eventController.eventControllerUpdateById(id,request)
  }
  removeEvent(id){
    return this.eventController.eventControllerDeleteById(id)
  }


}
  

