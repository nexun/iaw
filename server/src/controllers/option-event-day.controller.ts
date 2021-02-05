import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Option,
  EventDay,
} from '../models';
import {OptionRepository} from '../repositories';

export class OptionEventDayController {
  constructor(
    @repository(OptionRepository)
    public optionRepository: OptionRepository,
  ) { }

  @get('/options/{id}/event-day', {
    responses: {
      '200': {
        description: 'EventDay belonging to Option',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventDay)},
          },
        },
      },
    },
  })
  async getEventDay(
    @param.path.string('id') id: typeof Option.prototype.id,
  ): Promise<EventDay> {
    return this.optionRepository.eventDay(id);
  }
}
