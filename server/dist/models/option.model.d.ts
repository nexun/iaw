import { Entity } from '@loopback/repository';
export declare class Option extends Entity {
    id?: string;
    fecha: string;
    eventId: string;
    emailVotante: string;
    constructor(data?: Partial<Option>);
}
export interface OptionRelations {
}
export declare type OptionWithRelations = Option & OptionRelations;
