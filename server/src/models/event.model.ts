import {Entity, model, property} from '@loopback/repository';

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
    type: 'array',
    itemType: 'string',
    required: true,
  })
  startDate: string[];

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
    required: true,
  })
  published: boolean;


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
