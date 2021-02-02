import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Event,
  EventDay,
} from '../models';
import {EventRepository} from '../repositories';

export class EventEventDayController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/event-days', {
    responses: {
      '200': {
        description: 'Array of Event has many EventDay',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventDay)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EventDay>,
  ): Promise<EventDay[]> {
    return this.eventRepository.eventDays(id).find(filter);
  }

  @post('/events/{id}/event-days', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventDay)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventDay, {
            title: 'NewEventDayInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) eventDay: Omit<EventDay, 'id'>,
  ): Promise<EventDay> {
    return this.eventRepository.eventDays(id).create(eventDay);
  }

  @patch('/events/{id}/event-days', {
    responses: {
      '200': {
        description: 'Event.EventDay PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventDay, {partial: true}),
        },
      },
    })
    eventDay: Partial<EventDay>,
    @param.query.object('where', getWhereSchemaFor(EventDay)) where?: Where<EventDay>,
  ): Promise<Count> {
    return this.eventRepository.eventDays(id).patch(eventDay, where);
  }

  @del('/events/{id}/event-days', {
    responses: {
      '200': {
        description: 'Event.EventDay DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EventDay)) where?: Where<EventDay>,
  ): Promise<Count> {
    return this.eventRepository.eventDays(id).delete(where);
  }
}
