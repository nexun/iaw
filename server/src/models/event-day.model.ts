import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Event} from './event.model';
import {Option} from './option.model';

@model()
export class EventDay extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  eventDate: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @belongsTo(() => Event)
  eventId: string;

  @hasMany(() => Option)
  options: Option[];

  constructor(data?: Partial<EventDay>) {
    super(data);
  }
}

export interface EventDayRelations {
  // describe navigational properties here
}

export type EventDayWithRelations = EventDay & EventDayRelations;
