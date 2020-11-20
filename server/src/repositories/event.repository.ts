import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Option} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OptionRepository} from './option.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly event_option: HasManyRepositoryFactory<Option, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>,
  ) {
    super(Event, dataSource);
    this.event_option = this.createHasManyRepositoryFactoryFor('event_option', optionRepositoryGetter,);
    this.registerInclusionResolver('event_option', this.event_option.inclusionResolver);
  }
}
