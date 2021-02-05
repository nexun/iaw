import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Option, OptionRelations, EventDay} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventDayRepository} from './event-day.repository';

export class OptionRepository extends DefaultCrudRepository<
  Option,
  typeof Option.prototype.id,
  OptionRelations
> {

  public readonly eventDay: BelongsToAccessor<EventDay, typeof Option.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventDayRepository') protected eventDayRepositoryGetter: Getter<EventDayRepository>,
  ) {
    super(Option, dataSource);
    this.eventDay = this.createBelongsToAccessorFor('eventDay', eventDayRepositoryGetter,);
    this.registerInclusionResolver('eventDay', this.eventDay.inclusionResolver);
  }
}
