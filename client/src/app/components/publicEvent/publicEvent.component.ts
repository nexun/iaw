import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import { EventModel } from 'src/app/_model/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/_services/auth/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-publicEvent',
  templateUrl: './publicEvent.component.html',
  styleUrls: ['./publicEvent.component.css'],
})
export class PublicEventComponent implements OnInit {
  @ViewChild('modalEventContent', { static: true })
  modalEventContent: TemplateRef<any>;
  event: EventModel;
  filteredEvents: EventModel[];
  valueEmittedFromChildComponent: string = '';
  idx: string;
  eventDayForm: FormGroup;
  dataForm: FormGroup;
  msg: String;
  private: String;
  loading: boolean;

  constructor(
    private service: EventService,
    private activeRouter: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {}

  onRemove(id) {
    if (confirm('Desea eliminar el evento? ')) {
      this.service.removeEvent(id).subscribe((response) => this.ngOnInit());
    }
  }

  onChange(email: string, isChecked: boolean) {
    const daysForm = <FormArray>this.eventDayForm.controls.opcion;

    if (isChecked) {
      daysForm.push(new FormControl(email));
    } else {
      let index = daysForm.controls.findIndex((x) => x.value == email);
      daysForm.removeAt(index);
    }
  }

  handleClick() {
    const opciones = this.eventDayForm.value.opcion;
    const email = this.eventDayForm.value.nombre;

    opciones.map((opcion) => {
      const opc = {
        emailVotante: email,
        eventDayId: opcion,
      };
      this.service.addOptionDay(opcion, opc).subscribe((response) => {
        this.activeRouter.navigate(['/signup', { success: true }]);
      });
    });
  }

  sumDate(day) {
    var fecha = new Date(day.eventDate);
    return fecha.setHours(fecha.getHours() + day.duration);
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

  async checkPassword(): Promise<void> {
    this.loading = true;
    var url = 'http://localhost:3000/events/access/' + this.idx;
    var data = { password: this.dataForm.value.password };

    const response = await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          this.service.getEventById(this.idx).subscribe((event) => {
            this.event = event;
            this.private = 'publico';
            this.loading = false;
          },
          (err) => {this.activeRouter.navigateByUrl('/signup')});
        } else {
          this.msg =
            ' <div class="alert alert-danger" display="" role="alert"> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Contraseña inválida</div>';
          this.loading = false;
        }
      })
      .catch((error) => console.error('Error:', 'Password incorrecto'));
  }

  async checkPrivacy(): Promise<void> {
    var url = 'http://localhost:3000/events/access/' + this.idx;

    const response = await fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          this.private = 'privado';
          this.loading = false;
        } else {
          this.service.getEventById(this.idx).subscribe((event) => {
            this.event = event;
            this.private = 'publico';
            this.loading = false;
          },
          (err) => {this.activeRouter.navigateByUrl('/signup')});
        }
      })
      .catch();
  }

  ngOnInit(): void {
    this.loading = true;
    this.private = 'cargando';
    this.idx = this.route.snapshot.paramMap.get('id');
    this.checkPrivacy();

    this.eventDayForm = this.fb.group({
      opcion: this.fb.array([], Validators.required),
      nombre: this.fb.control('', [Validators.required, Validators.email]),
    });
    this.dataForm = this.fb.group({
      password: this.fb.control('', [Validators.required]),
    });
  }
}
