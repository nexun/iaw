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


export interface OptionScopeFilter { 
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    where?: { [key: string]: object; };
    fields?: any | Set<string>;
    include?: Array<{ [key: string]: object; }>;
}

