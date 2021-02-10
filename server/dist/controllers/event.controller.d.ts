import { Count, Filter, FilterExcludingWhere, Where } from "@loopback/repository";
import { Event } from "../models";
import { EventRepository } from "../repositories";
export declare class EventController {
    eventRepository: EventRepository;
    constructor(eventRepository: EventRepository);
    create(event: Omit<Event, "id">): Promise<Event>;
    count(where?: Where<Event>): Promise<Count>;
    find(filter?: Filter<Event>): Promise<Event[]>;
    updateAll(event: Event, where?: Where<Event>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Event>): Promise<Event>;
    findByEmail(email: string, filter?: Filter<Event>): Promise<Event[]>;
    updateById(id: string, event: Event): Promise<void>;
    replaceById(id: string, event: Event): Promise<void>;
    deleteById(id: string): Promise<void>;
    checkPassword(id: string, event: Event): Promise<void>;
    checkPrivacy(id: string, event: Event): Promise<void>;
}
