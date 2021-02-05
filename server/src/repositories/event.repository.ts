import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, EventDay} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventDayRepository} from './event-day.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventDayRepository') protected eventDayRepositoryGetter: Getter<EventDayRepository>,
  ) {
    super(Event, dataSource);
    this.eventDays = this.createHasManyRepositoryFactoryFor('eventDays', eventDayRepositoryGetter,);
    this.registerInclusionResolver('eventDays', this.eventDays.inclusionResolver);
  }
}
