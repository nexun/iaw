import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model'

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  
  events:EventModel[]

  constructor(private service: EventService) {     
  }
    
  onRemove(anEvent){
    // this.service.removeEvent(anEvent)
  }

  ngOnInit(): void {
    this.service.getEvents()    
  }

  

}
