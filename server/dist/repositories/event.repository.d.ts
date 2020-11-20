import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Event, EventRelations, Option } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { OptionRepository } from './option.repository';
export declare class EventRepository extends DefaultCrudRepository<Event, typeof Event.prototype.id, EventRelations> {
    protected optionRepositoryGetter: Getter<OptionRepository>;
    readonly event_option: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;
    constructor(dataSource: MongoDataSource, optionRepositoryGetter: Getter<OptionRepository>);
}
