import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Event} from './event.model';

@model()
export class Option extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'date',
  })
  fecha: string;

  @property({
    type: 'string',
  })
  emailVotante: string;

  @belongsTo(() => Event)
  eventId: string;

  constructor(data?: Partial<Option>) {
    super(data);
  }
}

export interface OptionRelations {
  // describe navigational properties here
}

export type OptionWithRelations = Option & OptionRelations;
