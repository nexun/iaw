import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Option, OptionRelations, Event } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { EventRepository } from './event.repository';
export declare class OptionRepository extends DefaultCrudRepository<Option, typeof Option.prototype.id, OptionRelations> {
    protected eventRepositoryGetter: Getter<EventRepository>;
    readonly event: BelongsToAccessor<Event, typeof Option.prototype.id>;
    constructor(dataSource: MongoDataSource, eventRepositoryGetter: Getter<EventRepository>);
}
