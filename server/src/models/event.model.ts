import {Entity, model, property, hasMany} from '@loopback/repository';
import {Option} from './option.model';

@model()
export class Event extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  startDate: string;

  @property({
    type: 'date',
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerEmail: string;

  @property({
    type: 'string',
  })
  publicLink?: string;

  @property({
    type: 'string',
  })
  privateLink?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  published?: boolean;

  // Define well-known properties here
  @hasMany(() => Option)
  event_option: Option[];
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
