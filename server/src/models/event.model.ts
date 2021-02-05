import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Option} from './option.model';
import {EventDay} from './event-day.model';

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
    type: 'string',
    required: true,
  })
  ownerEmail: string;

  @property({
    type: 'string',
  })
  password: string;
    
  @property({
    type: 'boolean',
    default: true,
  })
  published?: boolean;

  @hasMany(() => EventDay)
  eventDays: EventDay[];
  // Define well-known properties here
 
  
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
