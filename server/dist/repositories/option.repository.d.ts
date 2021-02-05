import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Option, OptionRelations, EventDay } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { EventDayRepository } from './event-day.repository';
export declare class OptionRepository extends DefaultCrudRepository<Option, typeof Option.prototype.id, OptionRelations> {
    protected eventDayRepositoryGetter: Getter<EventDayRepository>;
    readonly eventDay: BelongsToAccessor<EventDay, typeof Option.prototype.id>;
    constructor(dataSource: MongoDataSource, eventDayRepositoryGetter: Getter<EventDayRepository>);
}
