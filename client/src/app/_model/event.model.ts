import { Event, EventWithRelations } from "src/app/openapi";

export class EventModel implements EventWithRelations, Event {
    id?
    name:string;
    startDate:string;
    endDate: string;
    ownerEmail: string;
    constructor(){
     
    }

}
