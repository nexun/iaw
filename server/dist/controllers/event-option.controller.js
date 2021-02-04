"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventOptionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let EventOptionController = class EventOptionController {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async find(id, filter) {
        return this.eventRepository.options(id).find(filter);
    }
    async create(id, option) {
        return this.eventRepository.options(id).create(option);
    }
    async patch(id, option, where) {
        return this.eventRepository.options(id).patch(option, where);
    }
    async delete(id, where) {
        return this.eventRepository.options(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/events/{id}/options', {
        responses: {
            '200': {
                description: 'Array of Event has many Option',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Option) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventOptionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/events/{id}/options', {
        responses: {
            '200': {
                description: 'Event model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Option) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Option, {
                    title: 'NewOptionInEvent',
                    exclude: ['id'],
                    optional: ['eventId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventOptionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/events/{id}/options', {
        responses: {
            '200': {
                description: 'Event.Option PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Option, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Option))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventOptionController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/events/{id}/options', {
        responses: {
            '200': {
                description: 'Event.Option DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Option))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventOptionController.prototype, "delete", null);
EventOptionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.EventRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.EventRepository])
], EventOptionController);
exports.EventOptionController = EventOptionController;
//# sourceMappingURL=event-option.controller.js.map