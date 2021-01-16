import { Event, EventWithRelations } from "src/app/openapi";

export class EventModel implements EventWithRelations, Event {
    id?
    name:string;
    date:Date;    
    constructor(){
     
    }

}
