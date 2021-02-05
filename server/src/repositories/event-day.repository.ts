import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {EventDay, EventDayRelations, Event, Option} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventRepository} from './event.repository';
import {OptionRepository} from './option.repository';

export class EventDayRepository extends DefaultCrudRepository<
  EventDay,
  typeof EventDay.prototype.id,
  EventDayRelations
> {

  public readonly event: BelongsToAccessor<Event, typeof EventDay.prototype.id>;

  public readonly options: HasManyRepositoryFactory<Option, typeof EventDay.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>,
  ) {
    super(EventDay, dataSource);
    this.options = this.createHasManyRepositoryFactoryFor('options', optionRepositoryGetter,);
    this.registerInclusionResolver('options', this.options.inclusionResolver);
    this.event = this.createBelongsToAccessorFor('event', eventRepositoryGetter,);
    this.registerInclusionResolver('event', this.event.inclusionResolver);
  }
}
