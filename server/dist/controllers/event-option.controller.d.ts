import { Count, Filter, Where } from '@loopback/repository';
import { Event, Option } from '../models';
import { EventRepository } from '../repositories';
export declare class EventOptionController {
    protected eventRepository: EventRepository;
    constructor(eventRepository: EventRepository);
    find(id: string, filter?: Filter<Option>): Promise<Option[]>;
    create(id: typeof Event.prototype.id, option: Omit<Option, 'id'>): Promise<Option>;
    patch(id: string, option: Partial<Option>, where?: Where<Option>): Promise<Count>;
    delete(id: string, where?: Where<Option>): Promise<Count>;
}
