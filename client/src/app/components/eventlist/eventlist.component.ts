import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDayWithRelations } from 'src/app/openapi';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  events: EventModel[];
  filteredEvents: EventModel[];
  optiones: EventDayWithRelations[];
  valueEmittedFromChildComponent: string = '';

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
  parentEventHandlerFunction(valueEmitted) {
    this.valueEmittedFromChildComponent = valueEmitted;
    //alert(valueEmitted)
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

  ngOnInit(): void {
    const email = this.tokenService.getUser().email;

    this.service
      .getEvents()
      .subscribe(
        (events) =>
          {
            this.filteredEvents = events.filter( (event) => event.ownerEmail == email )
          }
      );
  }
}
