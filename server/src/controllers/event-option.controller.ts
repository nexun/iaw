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
  Option,
} from '../models';
import {EventRepository} from '../repositories';

export class EventOptionController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/options', {
    responses: {
      '200': {
        description: 'Array of Event has many Option',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Option)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Option>,
  ): Promise<Option[]> {
    return this.eventRepository.options(id).find(filter);
  }

  @post('/events/{id}/options', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Option)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {
            title: 'NewOptionInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) option: Omit<Option, 'id'>,
  ): Promise<Option> {
    return this.eventRepository.options(id).create(option);
  }

  @patch('/events/{id}/options', {
    responses: {
      '200': {
        description: 'Event.Option PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {partial: true}),
        },
      },
    })
    option: Partial<Option>,
    @param.query.object('where', getWhereSchemaFor(Option)) where?: Where<Option>,
  ): Promise<Count> {
    return this.eventRepository.options(id).patch(option, where);
  }

  @del('/events/{id}/options', {
    responses: {
      '200': {
        description: 'Event.Option DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Option)) where?: Where<Option>,
  ): Promise<Count> {
    return this.eventRepository.options(id).delete(where);
  }
}
