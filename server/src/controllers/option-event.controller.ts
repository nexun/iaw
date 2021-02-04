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
  Event,
} from '../models';
import {OptionRepository} from '../repositories';

export class OptionEventController {
  constructor(
    @repository(OptionRepository)
    public optionRepository: OptionRepository,
  ) { }

  @get('/options/{id}/event', {
    responses: {
      '200': {
        description: 'Event belonging to Option',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Event)},
          },
        },
      },
    },
  })
  async getEvent(
    @param.path.string('id') id: typeof Option.prototype.id,
  ): Promise<Event> {
    return this.optionRepository.event(id);
  }
}
