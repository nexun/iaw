import {ActivatedRoute,Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EventModel } from 'src/app/_model/event.model'

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {

newEventForm: FormGroup
event:EventModel;
idx:string;
  constructor(private router: Router, private service:EventService, private route:ActivatedRoute) { 
    this.newEventForm = new FormGroup({
      eventName: new FormControl()
    }); 
  }
  /*
  onSubmit(){
    this.addEvent(new Event(this.newEventForm.get('eventName').value))
  }*/
  updateForm(){
    this.newEventForm = new FormGroup({
      itemName: new FormControl(this.event.name)
    });
  }


  addEvent(anEvent:EventModel){
    //this.service.addEvent(anEvent)
    this.router.navigateByUrl('/home')
  }

  ngOnInit() {
    this.idx=this.route.snapshot.paramMap.get('idx');
    if(this.idx==null){      
      this.event =new EventModel();
    }else{       
      this.event= this.service.getEventList()[this.idx]      }
    this.newEventForm = new FormGroup({ eventName: new FormControl(this.event.name)  }); 
  };
  onSubmit(): void {
    this.event.name=this.newEventForm.get('eventName').value
    if(this.idx==null){this.addEvent(this.event);}
    this.router.navigateByUrl('/home') 
  } 

}
