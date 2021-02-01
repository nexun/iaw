import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
    required: true,
  })
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
