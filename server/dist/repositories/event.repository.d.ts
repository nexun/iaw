import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Event, EventRelations, Option, EventDay } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { OptionRepository } from './option.repository';
import { EventDayRepository } from './event-day.repository';
export declare class EventRepository extends DefaultCrudRepository<Event, typeof Event.prototype.id, EventRelations> {
    protected optionRepositoryGetter: Getter<OptionRepository>;
    protected eventDayRepositoryGetter: Getter<EventDayRepository>;
    readonly event_option: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;
    readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;
    constructor(dataSource: MongoDataSource, optionRepositoryGetter: Getter<OptionRepository>, eventDayRepositoryGetter: Getter<EventDayRepository>);
}
