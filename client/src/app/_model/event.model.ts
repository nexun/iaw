import { Event, EventDayWithRelations, EventWithRelations } from "src/app/openapi";

export class EventModel implements EventWithRelations, Event {
    id?
    name:string;
    ownerEmail: string;
    password?: string;
    eventDays?: Array<EventDayWithRelations>;
    constructor(){
     
    }

}
