/**
 * event-apirest
 * ingapp
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { OptionWithRelations } from './optionWithRelations';


/**
 * (tsType: EventWithRelations, schemaOptions: { includeRelations: true })
 */
export interface EventWithRelations { 
    id?: string;
    name: string;
    date: string;
    endDate: string;
    ownerEmail: string;
    event_option?: Array<OptionWithRelations>;
}
