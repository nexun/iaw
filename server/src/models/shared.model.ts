import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Shared extends Model {
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
  hash: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shared>) {
    super(data);
  }
}

export interface SharedRelations {
  // describe navigational properties here
}

export type SharedWithRelations = Shared & SharedRelations;
