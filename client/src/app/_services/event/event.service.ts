import { Injectable } from '@angular/core';
import { EventModel } from 'src/app/_model/event.model';

@Injectable({  providedIn: 'root' })
export class EventService {

  events:Event[]

  constructor() {  
   
    this.events = [
      new Event("CUMPLE 1"),
      new Event("CUMPLE 2"),
      new Event("CUMPLE 3")
      ]
    }
    
  getEventList(){
    return this.events
  }
  addEvent(event:Event){
    this.events.push(event)
  }
  editEvent(event:Event){
    this.events = this.events.filter(i=>event!==i)
  }
  removeEvent(event:Event){
    this.events = this.events.filter(i=>event!==i)
  }}
  

