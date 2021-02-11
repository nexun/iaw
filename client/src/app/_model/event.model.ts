import { Event, EventDayWithRelations, EventWithRelations } from "src/app/openapi";

export class EventModel implements EventWithRelations, Event {
    id?
    name:string;
    ownerEmail: string;
    password?:string;
    published?:boolean;
    eventDays?: Array<EventDayWithRelations>;
    constructor(){
     
    }

}
