import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDay, EventDayWithRelations } from 'src/app/openapi';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  @ViewChild('modalEditContent', { static: true })
  modalEditContent: TemplateRef<any>;
  @ViewChild('modalOptionContent', { static: true })
  modalOptionContent: TemplateRef<any>;
  @ViewChild('modalShare', { static: true })
  modalShared: TemplateRef<any>;
  events: EventModel[];
  days: EventDay[];
  id: string;

  filteredEvents: EventModel[];
  optiones: EventDayWithRelations[];
  valueEmittedFromChildComponent: string = '';
  eventId: any;
  refresh: Subject<any> = new Subject();

  constructor(
    private service: EventService,
    private activeRouter: Router,
    private tokenService: TokenService,
    private modal: NgbModal
  ) {}

  onRemove(id) {
    if (confirm('Desea eliminar el evento? ')) {
      this.service.removeEvent(id).subscribe((response) => this.ngOnInit());
    }
  }

  sumDate(day) {
    var fecha = new Date(day.eventDate);
    return fecha.setHours(fecha.getHours() + day.duration);
  }

  parentEventHandlerFunction(valueEmitted) {
    this.valueEmittedFromChildComponent = valueEmitted;
        
    if (valueEmitted) {
      this.modal.dismissAll();
      this.ngOnInit();
    } else {
      this.modal.dismissAll();
    }
  }

  handleAddEvent(): void {
    this.modal.open(this.modalEventContent, { size: 'lg' });
  }

  handleEditEvent(eventId): void {
    this.eventId = eventId;
    this.modal.open(this.modalEditContent, { size: 'lg' });    
  }

  handleViewVotes(eventDays): void {
    console.log(eventDays);
    this.days = eventDays;
    this.modal.open(this.modalOptionContent, { size: 'lg' });
  }

  handleViewLink(id): void {
    this.id = 'http://localhost:4200/public/' + id;
    this.modal.open(this.modalShared, { size: 'lg' });
  }

  ngOnInit(): void { 
    const email = this.tokenService.getUser().email;

    this.service.getEvents().subscribe((events) => {
      this.filteredEvents = events.filter((event) => event.ownerEmail == email).reverse();
    });
  }
}
