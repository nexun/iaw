"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let OptionRepository = class OptionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, eventDayRepositoryGetter) {
        super(models_1.Option, dataSource);
        this.eventDayRepositoryGetter = eventDayRepositoryGetter;
        this.eventDay = this.createBelongsToAccessorFor('eventDay', eventDayRepositoryGetter);
        this.registerInclusionResolver('eventDay', this.eventDay.inclusionResolver);
    }
};
OptionRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo')), tslib_1.__param(1, repository_1.repository.getter('EventDayRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource, Function])
], OptionRepository);
exports.OptionRepository = OptionRepository;
//# sourceMappingURL=option.repository.js.map