"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const event_day_model_1 = require("./event-day.model");
let Option = class Option extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], Option.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Option.prototype, "emailVotante", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => event_day_model_1.EventDay),
    tslib_1.__metadata("design:type", String)
], Option.prototype, "eventDayId", void 0);
Option = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Option);
exports.Option = Option;
//# sourceMappingURL=option.model.js.map