import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Event} from './event.model';

@model({settings: {strict: false}})
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
  date: string;

  @belongsTo(() => Event)
  eventId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EventDay>) {
    super(data);
  }
}

export interface EventDayRelations {
  // describe navigational properties here
}

export type EventDayWithRelations = EventDay & EventDayRelations;
