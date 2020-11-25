import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';
import { EventModel } from 'src/app/_model/event.model';

@Injectable({  providedIn: 'root' })
export class EventService {

  events:EventModel[]
  dataForm: FormGroup;

  constructor(  
    private eventController:EventControllerService,
    private activeRouter: Router,
    ) {    }
    
  getEvents(){
    this.eventController.eventControllerFind().subscribe(events=>this.events=events)
  }

  getEvent(id){
    this.eventController.eventControllerFindById(id).subscribe(events=>events)
  }
  addEvent(){

    if (this.dataForm.valid){
      const request = {
        name:this.dataForm.value.name,
        date:this.dataForm.value.date      
      }
      this.eventController.eventControllerCreate(request).subscribe((response)=>{
        this.activeRouter.navigateByUrl('/home');
      })
  
    }
  }
  editEvent(event:Event){
    //this.events = this.events.filter(i=>event!==i)
  }
  removeEvent(event:Event){
    //this.events = this.events.filter(i=>event!==i)
  }}
  

