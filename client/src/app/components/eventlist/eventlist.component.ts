import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  
  events:EventModel[]

  constructor(
    private service: EventService,
    private activeRouter: Router
    ) {     
  }
  
  onRemove(id){
    if(confirm("Desea eliminar el evento? ")) {
      this.service.removeEvent(id).subscribe((response)=>this.ngOnInit())
    }
     
     
  }

  ngOnInit(): void {
    this.service.getEvents().subscribe(events=>this.events=events)
  }

  

}
