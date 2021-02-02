import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EventDay,
  Event,
} from '../models';
import {EventDayRepository} from '../repositories';

export class EventDayEventController {
  constructor(
    @repository(EventDayRepository)
    public eventDayRepository: EventDayRepository,
  ) { }

  @get('/event-days/{id}/event', {
    responses: {
      '200': {
        description: 'Event belonging to EventDay',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Event)},
          },
        },
      },
    },
  })
  async getEvent(
    @param.path.string('id') id: typeof EventDay.prototype.id,
  ): Promise<Event> {
    return this.eventDayRepository.event(id);
  }
}
