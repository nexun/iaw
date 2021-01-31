import { Option, OptionWithRelations } from "src/app/openapi";

export class OptionModel implements OptionWithRelations, Option {
    id?   
    emailVotante: string;
    eventId: string;
    fecha: string;
    constructor(){
     
    }
    

}
