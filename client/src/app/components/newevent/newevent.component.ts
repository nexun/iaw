import {ActivatedRoute,Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EventModel } from 'src/app/_model/event.model'
import { EventControllerService, UserControllerService } from 'src/app/openapi';
import { EventlistComponent } from '../eventlist/eventlist.component';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {

//newEventForm: FormGroup
dataForm: FormGroup;
event:EventModel;
idx:string;
constructor(
  private router: Router, 
  private service:EventService, 
  private newEventForm: FormBuilder,
  private controllerEvent: EventControllerService,
  private route:ActivatedRoute
  )   {
    this.init();
  } 

  addEvent(){
    this.service.addEvent()
    this.router.navigateByUrl('/home')
  }

  ngOnInit() {
      this.idx=this.route.snapshot.paramMap.get('idx');
    if(this.idx==null){      
      this.event =new EventModel();
    }else{       
      this.controllerEvent.eventControllerFindById(this.idx).subscribe(event=>this.event=event) }
      this.dataForm = new FormGroup({ eventName: new FormControl(this.event.name)  }); 
  };
  init(){
    this.dataForm = this.newEventForm.group({
      name:['', Validators.required],
      date:['', Validators.required]
    })
  }
  onSubmit(): void {/*
    this.event.name=this.newEventForm.get('eventName').value
    if(this.idx==null){this.addEvent(this.event);}
    this.router.navigateByUrl('/home') */
  } 

}
