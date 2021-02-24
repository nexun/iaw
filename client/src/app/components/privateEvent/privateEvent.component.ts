import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDay, EventDayWithRelations } from 'src/app/openapi';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-privateEvent',
  templateUrl: './privateEvent.component.html',
  styleUrls: ['./privateEvent.component.css'],
})
export class PrivateEventComponent implements OnInit {
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  @ViewChild('modalEditContent', { static: true })
  modalEditContent: TemplateRef<any>;
  @ViewChild('modalOptionContent', { static: true })
  modalOptionContent: TemplateRef<any>;
  @ViewChild('modalShare', { static: true })
  modalShared: TemplateRef<any>;
  event: EventModel;
  days: EventDay[];
  idx: string;
  id: string;
  optiones: EventDayWithRelations[];
  valueEmittedFromChildComponent: string = '';
  eventId: any;
  refresh: Subject<any> = new Subject();
  loading: boolean;
  loadingVotes: boolean;

  constructor(
    private service: EventService,
    private activeRouter: Router,
    private route: ActivatedRoute,
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



  handleAddEvent(): void {
    this.modal.open(this.modalEventContent, { size: 'lg' });
  }

  handleEditEvent(): void {
    this.modal.open(this.modalEditContent, { size: 'lg' });
  }

  handleViewVotes(): void {
    this.loadingVotes = true;
    this.modal.open(this.modalOptionContent, { size: 'lg' });
    this.service.getEventById(this.idx).subscribe((evento) => {
      this.event = evento;
      this.eventId = evento.id
      this.loadingVotes = false;
      this.days = this.event.eventDays;
      console.log(this.days)

    });
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
  
  handleViewLink(): void {
    this.id = 'http://localhost:4200/public/' + this.idx;
    this.modal.open(this.modalShared, { size: 'lg' });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadingVotes = false;
    this.idx = this.route.snapshot.paramMap.get('id');
    this.service.getEventById(this.idx).subscribe((evento) => {
      this.event = evento;
      this.eventId = evento.id
      this.loading = false;
    },
    (err) => {this.activeRouter.navigateByUrl('/signup')}
    );
  }
}
