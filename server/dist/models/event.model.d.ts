import { Entity } from '@loopback/repository';
import { Option } from './option.model';
import { EventDay } from './event-day.model';
export declare class Event extends Entity {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    ownerEmail: string;
    publicLink?: string;
    privateLink?: string;
    published?: boolean;
    eventDays: EventDay[];
    event_option: Option[];
    [prop: string]: any;
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
