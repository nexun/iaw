import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventControllerService } from 'src/app/openapi';
import { EventModel } from 'src/app/_model/event.model'

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  
  events:EventModel[]

  constructor(private service: EventService, private eventController:EventControllerService) {     
  }
   /*
  getEvents(){
    this.events=this.service.getEventList()
  }*/
  
  getEvents(){
    this.eventController.eventControllerFind().subscribe(events=>(this.events=events))
  }
  
  onRemove(anEvent){
     this.service.removeEvent(anEvent)
  }

  ngOnInit(): void {
    this.getEvents()    
  }

  

}
