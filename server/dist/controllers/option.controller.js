"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let OptionController = class OptionController {
    constructor(optionRepository) {
        this.optionRepository = optionRepository;
    }
    async create(option) {
        return this.optionRepository.create(option);
    }
    async count(where) {
        return this.optionRepository.count(where);
    }
    async find(filter) {
        return this.optionRepository.find(filter);
    }
    async updateAll(option, where) {
        return this.optionRepository.updateAll(option, where);
    }
    async findById(id, filter) {
        return this.optionRepository.findById(id, filter);
    }
    async updateById(id, option) {
        await this.optionRepository.updateById(id, option);
    }
    async replaceById(id, option) {
        await this.optionRepository.replaceById(id, option);
    }
    async deleteById(id) {
        await this.optionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/options', {
        responses: {
            '200': {
                description: 'Option model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Option) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Option, {
                    title: 'NewOption',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/options/count', {
        responses: {
            '200': {
                description: 'Option model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Option)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/options', {
        responses: {
            '200': {
                description: 'Array of Option model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Option, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Option)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/options', {
        responses: {
            '200': {
                description: 'Option PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Option, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Option)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Option, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/options/{id}', {
        responses: {
            '200': {
                description: 'Option model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Option, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Option, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/options/{id}', {
        responses: {
            '204': {
                description: 'Option PATCH success',
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Option]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/options/{id}', {
        responses: {
            '204': {
                description: 'Option PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Option]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/options/{id}', {
        responses: {
            '204': {
                description: 'Option DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OptionController.prototype, "deleteById", null);
OptionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OptionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OptionRepository])
], OptionController);
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map