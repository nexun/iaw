import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {EventDay, EventDayRelations, Event} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventRepository} from './event.repository';

export class EventDayRepository extends DefaultCrudRepository<
  EventDay,
  typeof EventDay.prototype.id,
  EventDayRelations
> {

  public readonly event: BelongsToAccessor<Event, typeof EventDay.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(EventDay, dataSource);
    this.event = this.createBelongsToAccessorFor('event', eventRepositoryGetter,);
    this.registerInclusionResolver('event', this.event.inclusionResolver);
  }
}
