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
import {Option} from '../models';
import {OptionRepository} from '../repositories';

export class OptionController {
  constructor(
    @repository(OptionRepository)
    public optionRepository : OptionRepository,
  ) {}

  @post('/options', {
    responses: {
      '200': {
        description: 'Option model instance',
        content: {'application/json': {schema: getModelSchemaRef(Option)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {
            title: 'NewOption',
            exclude: ['id'],
          }),
        },
      },
    })
    option: Omit<Option, 'id'>,
  ): Promise<Option> {
    return this.optionRepository.create(option);
  }

  @get('/options/count', {
    responses: {
      '200': {
        description: 'Option model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Option) where?: Where<Option>,
  ): Promise<Count> {
    return this.optionRepository.count(where);
  }

  @get('/options', {
    responses: {
      '200': {
        description: 'Array of Option model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Option, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Option) filter?: Filter<Option>,
  ): Promise<Option[]> {
    return this.optionRepository.find(filter);
  }

  @patch('/options', {
    responses: {
      '200': {
        description: 'Option PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {partial: true}),
        },
      },
    })
    option: Option,
    @param.where(Option) where?: Where<Option>,
  ): Promise<Count> {
    return this.optionRepository.updateAll(option, where);
  }

  @get('/options/{id}', {
    responses: {
      '200': {
        description: 'Option model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Option, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Option, {exclude: 'where'}) filter?: FilterExcludingWhere<Option>
  ): Promise<Option> {
    return this.optionRepository.findById(id, filter);
  }

  @patch('/options/{id}', {
    responses: {
      '204': {
        description: 'Option PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {partial: true}),
        },
      },
    })
    option: Option,
  ): Promise<void> {
    await this.optionRepository.updateById(id, option);
  }

  @put('/options/{id}', {
    responses: {
      '204': {
        description: 'Option PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() option: Option,
  ): Promise<void> {
    await this.optionRepository.replaceById(id, option);
  }

  @del('/options/{id}', {
    responses: {
      '204': {
        description: 'Option DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.optionRepository.deleteById(id);
  }
}
