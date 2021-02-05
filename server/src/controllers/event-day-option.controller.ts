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
  EventDay,
  Option,
} from '../models';
import {EventDayRepository} from '../repositories';

export class EventDayOptionController {
  constructor(
    @repository(EventDayRepository) protected eventDayRepository: EventDayRepository,
  ) { }

  @get('/event-days/{id}/options', {
    responses: {
      '200': {
        description: 'Array of EventDay has many Option',
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
    return this.eventDayRepository.options(id).find(filter);
  }

  @post('/event-days/{id}/options', {
    responses: {
      '200': {
        description: 'EventDay model instance',
        content: {'application/json': {schema: getModelSchemaRef(Option)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EventDay.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {
            title: 'NewOptionInEventDay',
            exclude: ['id'],
            optional: ['eventDayId']
          }),
        },
      },
    }) option: Omit<Option, 'id'>,
  ): Promise<Option> {
    return this.eventDayRepository.options(id).create(option);
  }

  @patch('/event-days/{id}/options', {
    responses: {
      '200': {
        description: 'EventDay.Option PATCH success count',
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
    return this.eventDayRepository.options(id).patch(option, where);
  }

  @del('/event-days/{id}/options', {
    responses: {
      '200': {
        description: 'EventDay.Option DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Option)) where?: Where<Option>,
  ): Promise<Count> {
    return this.eventDayRepository.options(id).delete(where);
  }
}
