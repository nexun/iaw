"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const option_model_1 = require("./option.model");
const event_day_model_1 = require("./event-day.model");
let Event = class Event extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "startDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "endDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "ownerEmail", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "publicLink", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "privateLink", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Event.prototype, "published", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => event_day_model_1.EventDay),
    tslib_1.__metadata("design:type", Array)
], Event.prototype, "eventDays", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => option_model_1.Option),
    tslib_1.__metadata("design:type", Array)
], Event.prototype, "event_option", void 0);
Event = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Event);
exports.Event = Event;
//# sourceMappingURL=event.model.js.map