import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from "@loopback/rest";
import { Event } from "../models";
import { EventRepository } from "../repositories";

export class EventController {
  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository
  ) {}

  @post("/events", {
    responses: {
      "200": {
        description: "Event model instance",
        content: { "application/json": { schema: getModelSchemaRef(Event) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Event, {
            title: "NewEvent",
            exclude: ["id"],
          }),
        },
      },
    })
    event: Omit<Event, "id">
  ): Promise<Event> {
    return this.eventRepository.create(event);
  }

  @get("/events/count", {
    responses: {
      "200": {
        description: "Event model count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(Event) where?: Where<Event>): Promise<Count> {
    return this.eventRepository.count(where);
  }

  @get("/events", {
    responses: {
      "200": {
        description: "Array of Event model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Event, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Event) filter?: Filter<Event>): Promise<Event[]> {
    return this.eventRepository.find(
      {
        include: [
          {
            relation: "eventDays",
            scope: {
              include: ["options"],
            },
          },
        ],
      },
      filter
    );
  }

  @patch("/events", {
    responses: {
      "200": {
        description: "Event PATCH success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Event, { partial: true }),
        },
      },
    })
    event: Event,
    @param.where(Event) where?: Where<Event>
  ): Promise<Count> {
    return this.eventRepository.updateAll(event, where);
  }

  @get("/events/{id}", {
    responses: {
      "200": {
        description: "Event model instance",
        content: {
          "application/json": {
            schema: getModelSchemaRef(Event, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(Event, { exclude: "where" })
    filter?: FilterExcludingWhere<Event>
  ): Promise<Event> {
    return this.eventRepository.findById(
      id,
      {
        include: [
          {
            relation: "eventDays",
            scope: {
              include: ["options"],
            },
          },
        ],
      },
      filter
    );
  }

  @get("/events/email/{email}", {
    responses: {
      "200": {
        description: "Array of Event model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Event, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findByEmail(
    @param.path.string("email") email: string,
    @param.filter(Event) filter?: Filter<Event>
  ): Promise<Event[]> {
    return await this.eventRepository.find({
      where: { ownerEmail: email },
      include: [
        {
          relation: "eventDays",
          scope: {
            include: ["options"],
          },
        },
      ],
    });
  }

  @patch("/events/{id}", {
    responses: {
      "204": {
        description: "Event PATCH success",
      },
    },
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Event, { partial: true }),
        },
      },
    })
    event: Event
  ): Promise<void> {
    await this.eventRepository.updateById(id, event);
  }

  @put("/events/{id}", {
    responses: {
      "204": {
        description: "Event PUT success",
      },
    },
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() event: Event
  ): Promise<void> {
    await this.eventRepository.replaceById(id, event);
  }

  @del("/events/{id}", {
    responses: {
      "204": {
        description: "Event DELETE success",
      },
    },
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.eventRepository.deleteById(id);
  }

  @post("/events/access/{id}", {
    responses: {
      "200": {
        description: "Event POST success",
      },
    },
  })
  async checkPassword(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Event, { partial: true }),
        },
      },
    })
    event: Event
  ): Promise<void> {
    const evento = await this.eventRepository.findById(id);
    if (evento.password === event.password) {
    } else {
      throw {
        code: 400,
        message: "Password error",
        name: "IncorrectPasswordError",
      };
    }
  }
  @get("/events/access/{id}", {
    responses: {
      "200": {
        description: "Event GET success",
      },
    },
  })
  async checkPrivacy(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Event, { partial: true }),
        },
      },
    })
    event: Event
  ): Promise<void> {
    const evento = await this.eventRepository.findById(id);
    if (evento.password) {
    } else {
      throw {
        code: 400,
        message: "Password error",
        name: "IncorrectPasswordError",
      };
    }
  }
}
