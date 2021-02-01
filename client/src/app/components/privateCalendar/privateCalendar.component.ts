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
import { ActivatedRoute } from '@angular/router';
registerLocaleData(localeEs);

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
  styleUrls: ['publicCalendar.component.css'],
  templateUrl: 'publicCalendar.component.html',
})
export class PublicCalendar implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  @ViewChild('modalOptionContent', { static: true })
  modalOptionContent: TemplateRef<any>;
  locale: string = 'es';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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

  refresh: Subject<any> = new Subject();
  backEvents: EventModel;
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    private service: EventService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.events = [];
    var idx = this.route.snapshot.paramMap.get('id');
    //traerme los eventos del usuario
    const email = this.tokenService.getUser().email;
    this.service.getEventById(idx).subscribe((evento) => {
      const currentEvent = {
        start: new Date(evento.startDate),
        end: new Date(evento.endDate),
        title: evento.name,
        id: evento.id,
        color: colors.yellow,
      };

      this.events.push(currentEvent);
      this.refresh.next();
    });

    //console.log(this.events);
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

  handleAddOption(event: CalendarEvent): void {
    this.modalOptionData = { event };
    this.modal.open(this.modalOptionContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
