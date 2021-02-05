"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let EventRepository = class EventRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, eventDayRepositoryGetter) {
        super(models_1.Event, dataSource);
        this.eventDayRepositoryGetter = eventDayRepositoryGetter;
        this.eventDays = this.createHasManyRepositoryFactoryFor('eventDays', eventDayRepositoryGetter);
        this.registerInclusionResolver('eventDays', this.eventDays.inclusionResolver);
    }
};
EventRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo')), tslib_1.__param(1, repository_1.repository.getter('EventDayRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource, Function])
], EventRepository);
exports.EventRepository = EventRepository;
//# sourceMappingURL=event.repository.js.map