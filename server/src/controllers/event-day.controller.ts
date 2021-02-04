import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {EventDay} from '../models';
import {EventDayRepository} from '../repositories';

export class EventDayController {
  constructor(
    @repository(EventDayRepository)
    public eventDayRepository : EventDayRepository,
  ) {}

  @post('/event-days', {
    responses: {
      '200': {
        description: 'EventDay model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventDay)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventDay, {
            title: 'NewEventDay',
            exclude: ['id'],
          }),
        },
      },
    })
    eventDay: Omit<EventDay, 'id'>,
  ): Promise<EventDay> {
    return this.eventDayRepository.create(eventDay);
  }

  @get('/event-days/count', {
    responses: {
      '200': {
        description: 'EventDay model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EventDay) where?: Where<EventDay>,
  ): Promise<Count> {
    return this.eventDayRepository.count(where);
  }

  @get('/event-days', {
    responses: {
      '200': {
        description: 'Array of EventDay model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EventDay, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EventDay) filter?: Filter<EventDay>,
  ): Promise<EventDay[]> {
    return this.eventDayRepository.find(filter);
  }

  @patch('/event-days', {
    responses: {
      '200': {
        description: 'EventDay PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventDay, {partial: true}),
        },
      },
    })
    eventDay: EventDay,
    @param.where(EventDay) where?: Where<EventDay>,
  ): Promise<Count> {
    return this.eventDayRepository.updateAll(eventDay, where);
  }

  @get('/event-days/{id}', {
    responses: {
      '200': {
        description: 'EventDay model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventDay, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EventDay, {exclude: 'where'}) filter?: FilterExcludingWhere<EventDay>
  ): Promise<EventDay> {
    return this.eventDayRepository.findById(id, filter);
  }

  @patch('/event-days/{id}', {
    responses: {
      '204': {
        description: 'EventDay PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventDay, {partial: true}),
        },
      },
    })
    eventDay: EventDay,
  ): Promise<void> {
    await this.eventDayRepository.updateById(id, eventDay);
  }

  @put('/event-days/{id}', {
    responses: {
      '204': {
        description: 'EventDay PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eventDay: EventDay,
  ): Promise<void> {
    await this.eventDayRepository.replaceById(id, eventDay);
  }

  @del('/event-days/{id}', {
    responses: {
      '204': {
        description: 'EventDay DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventDayRepository.deleteById(id);
  }
}
