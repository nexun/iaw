import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';
import { EventModel } from 'src/app/_model/event.model';

@Injectable({  providedIn: 'root' })
export class EventService {

  events:EventModel[]

  constructor(  
    private eventController:EventControllerService,
    private activeRouter: Router,
    ) {    }
    
  getEvents(){
    return this.eventController.eventControllerFind()
  }

  getEvent(id){
    this.eventController.eventControllerFindById(id).subscribe(events=>events)
  }  
  addEvent(event){    
    this.eventController.eventControllerCreate(event).subscribe(response=>response) //ver
  }
  editEvent(id,request){
    return this.eventController.eventControllerUpdateById(id,request)
  }
  removeEvent(id){
    return this.eventController.eventControllerDeleteById(id)
  }
  getEventByEmail(email){
    //este metodo no anda hasta que haga el modelo
   // this.eventController.eventControllerFindByEmail(email).subscribe(events=>events)
  }
}
  

