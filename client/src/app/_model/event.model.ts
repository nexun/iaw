import { Event, EventWithRelations } from "src/app/openapi";

export class EventModel implements EventWithRelations, Event {
    name:string;
    date:Date;    
    constructor(){
     
    }

}
