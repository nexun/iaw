import { DefaultCrudRepository } from '@loopback/repository';
import { Event, EventRelations } from '../models';
import { MongoDataSource } from '../datasources';
export declare class EventRepository extends DefaultCrudRepository<Event, typeof Event.prototype.id, EventRelations> {
    constructor(dataSource: MongoDataSource);
}
