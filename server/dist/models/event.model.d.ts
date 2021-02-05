import { Entity } from '@loopback/repository';
import { EventDay } from './event-day.model';
export declare class Event extends Entity {
    id?: string;
    name: string;
    ownerEmail: string;
    password: string;
    published?: boolean;
    eventDays: EventDay[];
    [prop: string]: any;
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
