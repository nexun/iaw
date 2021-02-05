import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import { EventDay } from './event-day.model';
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
    type: 'string',
  })
  emailVotante: string;

  @belongsTo(() => EventDay)
  eventDayId: string;

  constructor(data?: Partial<Option>) {
    super(data);
  }
}

export interface OptionRelations {
  // describe navigational properties here
}

export type OptionWithRelations = Option & OptionRelations;
