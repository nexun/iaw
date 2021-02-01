import { Entity } from '@loopback/repository';
export declare class Event extends Entity {
    id?: string;
    name: string;
    startDate: string[];
    ownerEmail: string;
    publicLink?: string;
    privateLink?: string;
    published: boolean;
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
