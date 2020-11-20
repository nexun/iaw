import { Entity } from '@loopback/repository';
import { Option } from './option.model';
export declare class Event extends Entity {
    id?: string;
    name: string;
    date: Date;
    event_option: Option[];
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
