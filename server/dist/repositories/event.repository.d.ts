import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Event, EventRelations, EventDay } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { EventDayRepository } from './event-day.repository';
export declare class EventRepository extends DefaultCrudRepository<Event, typeof Event.prototype.id, EventRelations> {
    protected eventDayRepositoryGetter: Getter<EventDayRepository>;
    readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;
    constructor(dataSource: MongoDataSource, eventDayRepositoryGetter: Getter<EventDayRepository>);
}
