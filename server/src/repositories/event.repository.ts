import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, EventDay, Option} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventDayRepository} from './event-day.repository';
import {OptionRepository} from './option.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly eventDays: HasManyRepositoryFactory<EventDay, typeof Event.prototype.id>;

  public readonly options: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventDayRepository') protected eventDayRepositoryGetter: Getter<EventDayRepository>, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>,
  ) {
    super(Event, dataSource);
    this.options = this.createHasManyRepositoryFactoryFor('options', optionRepositoryGetter,);
    this.registerInclusionResolver('options', this.options.inclusionResolver);
    this.eventDays = this.createHasManyRepositoryFactoryFor('eventDays', eventDayRepositoryGetter,);
    this.registerInclusionResolver('eventDays', this.eventDays.inclusionResolver);
  }
}
