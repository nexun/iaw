"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'mongo',
    connector: 'mongodb',
    url: 'mongodb+srv://francob:5OM2LJc3addnC8zN@cluster0.6ggoz.mongodb.net/event_api?retryWrites=true&w=majority',
    useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MongoDataSource = class MongoDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MongoDataSource.dataSourceName = 'mongo';
MongoDataSource.defaultConfig = config;
MongoDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.mongo', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongoDataSource);
exports.MongoDataSource = MongoDataSource;
//# sourceMappingURL=mongo.datasource.js.map