import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Option, EventDay} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OptionRepository} from './option.repository';
import {EventDayRepository} from './event-day.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly event_option: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;

  public readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>, @repository.getter('EventDayRepository') protected eventDayRepositoryGetter: Getter<EventDayRepository>,
  ) {
    super(Event, dataSource);
    this.eventDays = this.createHasManyRepositoryFactoryFor('eventDays', eventDayRepositoryGetter,);
    this.registerInclusionResolver('eventDays', this.eventDays.inclusionResolver);
    this.event_option = this.createHasManyRepositoryFactoryFor('event_option', optionRepositoryGetter,);
    this.registerInclusionResolver('event_option', this.event_option.inclusionResolver);
  }
}
