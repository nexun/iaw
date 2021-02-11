import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_services/auth/token.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { OptionModel } from 'src/app/_model/option.model';
import { OptionWithRelations } from 'src/app/openapi';
registerLocaleData(localeEs);


interface Opcion {
  eventId: string;
  emailVotante: string;
}


const colors: any = {
  red: {
    primary: '#1e90ff',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#1e90ff',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html',
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  @ViewChild('modalOptionContent', { static: true })
  modalOptionContent: TemplateRef<any>;
  locale: string = 'es';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  modalOptionData: {
    event: CalendarEvent;
  };

  valueEmittedFromChildComponent: string = '';
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

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Editar', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Eliminar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject<any> = new Subject();
  backEvents: EventModel[];
  options: Opcion[];
  events: CalendarEvent[] = [
    /*
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions,
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue,
            allDay: true,
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: addHours(new Date(), 2),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },*/
  ];

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    private service: EventService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.events = [];
    this.options = [];
    this.service.getEvents().subscribe(events=>{this.backEvents=events;this.refresh.next();})
    this.refresh.next();
    //traerme los eventos del usuario
    const email = this.tokenService.getUser().email;
    this.service.getEvents().subscribe((eventos) => {
      //this.backEvents = eventos.filter((event) => event.ownerEmail == email);
      /*
      this.backEvents.forEach((element) => {
        const id = element.id;
        const fecha = new Date(element.startDate);
        const fechaFin = new Date(element.endDate);
        const name = element.name;
        //traerme tambien el usuario creador
        const currentEvent = {
          start: startOfDay(fecha),
          end: startOfDay(fechaFin),
          title: name,
          id: id,
          color: colors.yellow,
          actions: this.actions,
        };

        this.service.getEventOptions().subscribe((opciones) => {
          opciones.filter((opc) => {
            if (opc.eventId == id) {
              const op = {
                eventId: id,
                emailVotante: opc.emailVotante,
              };
              this.options.push(op);
              this.refresh.next();
            }
          });
        });
        this.events.push(currentEvent);
      });*/
      
      this.refresh.next();
    });
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //aca le pasa el evento cuando cliqueamos
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  handleAddEvent(): void {
    this.modal.open(this.modalEventContent, { size: 'lg' });
  }

  handleAddOption(event: CalendarEvent): void {
    this.modalOptionData = { event };
    this.modal.open(this.modalOptionContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if (confirm('Desea eliminar el evento? ' + eventToDelete.id)) {
      this.service
        .removeEvent(eventToDelete.id)
        .subscribe((response) => this.ngOnInit());
    }
  }

  editEvent(eventToEdit: CalendarEvent) {
    if (confirm('Desea eliminar el evento? ')) {
      this.service
        .removeEvent(eventToEdit.id)
        .subscribe((response) => this.ngOnInit());
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
