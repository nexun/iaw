import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Event, EventRelations, EventDay, Option } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { EventDayRepository } from './event-day.repository';
import { OptionRepository } from './option.repository';
export declare class EventRepository extends DefaultCrudRepository<Event, typeof Event.prototype.id, EventRelations> {
    protected eventDayRepositoryGetter: Getter<EventDayRepository>;
    protected optionRepositoryGetter: Getter<OptionRepository>;
    readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;
    readonly options: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;
    constructor(dataSource: MongoDataSource, eventDayRepositoryGetter: Getter<EventDayRepository>, optionRepositoryGetter: Getter<OptionRepository>);
}
